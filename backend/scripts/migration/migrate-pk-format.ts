/**
 * PK形式マイグレーションスクリプト
 *
 * ElectroDB のサービスプレフィックスを除去し、プレーンな値に統一する:
 *   userId: $runcheck#id_XXX     → XXX
 *   userId: $runcheck#userid_XXX → XXX
 *   userId: $runcheck             → GLOBAL
 *   email:  $runcheck#email_XXX  → XXX  (EmailIndex GSI)
 *
 * DynamoDB ではキー属性の更新ができないため「旧アイテム削除 + 新アイテム作成」で行う。
 *
 * Usage:
 *   npx ts-node scripts/migration/migrate-pk-format.ts [--dry-run]
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

const dryRun = process.argv.includes('--dry-run');
const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

const client = new DynamoDBClient({
  endpoint,
  region: 'ap-northeast-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

interface MigrationItem {
  original: Record<string, unknown>;
  newUserId: string;
  newEmail?: string;
}

function convertPk(value: string): string | null {
  // $runcheck#id_XXX → XXX
  if (value.startsWith('$runcheck#id_')) {
    return value.slice('$runcheck#id_'.length);
  }
  // $runcheck#userid_XXX → XXX
  if (value.startsWith('$runcheck#userid_')) {
    return value.slice('$runcheck#userid_'.length);
  }
  // $runcheck → GLOBAL (OperationLog)
  if (value === '$runcheck') {
    return 'GLOBAL';
  }
  return null;
}

function convertEmail(value: string): string | null {
  // $runcheck#email_XXX → XXX
  if (value.startsWith('$runcheck#email_')) {
    return value.slice('$runcheck#email_'.length);
  }
  return null;
}

async function scanItemsToMigrate(): Promise<MigrationItem[]> {
  const items: MigrationItem[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        ExclusiveStartKey: lastKey,
      }),
    );

    for (const item of result.Items ?? []) {
      const userId = item.userId as string;
      const newUserId = convertPk(userId);

      if (newUserId === null) continue; // already migrated

      const migrationItem: MigrationItem = {
        original: item,
        newUserId,
      };

      // EmailIndex GSI の PK も変換
      if (typeof item.email === 'string') {
        const newEmail = convertEmail(item.email);
        if (newEmail !== null) {
          migrationItem.newEmail = newEmail;
        }
      }

      items.push(migrationItem);
    }

    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items;
}

async function migrate() {
  console.log(`Migration mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Table: ${TABLE_NAME}`);
  console.log(`Endpoint: ${endpoint}\n`);

  const items = await scanItemsToMigrate();
  console.log(`Found ${items.length} items to migrate.\n`);

  if (items.length === 0) {
    console.log('Nothing to migrate.');
    return;
  }

  for (const { original, newUserId, newEmail } of items) {
    const oldUserId = original.userId as string;
    const kind = original.kind as string;
    console.log(`  ${oldUserId} → ${newUserId} | ${kind}${newEmail ? ` | email → ${newEmail}` : ''}`);

    if (dryRun) continue;

    const newItem = { ...original, userId: newUserId };
    if (newEmail !== undefined) {
      newItem.email = newEmail;
    }

    await docClient.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: TABLE_NAME,
              Item: newItem,
            },
          },
          {
            Delete: {
              TableName: TABLE_NAME,
              Key: { userId: oldUserId, kind },
            },
          },
        ],
      }),
    );
  }

  console.log(`\nMigration ${dryRun ? 'preview' : 'completed'}: ${items.length} items.`);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
