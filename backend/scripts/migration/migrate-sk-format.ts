/**
 * SK形式マイグレーションスクリプト
 *
 * 1:1エンティティのSKを簡略化する:
 *   USER@{id} → USER
 *   YOUTUBE_TOKEN@{id} → YOUTUBE_TOKEN
 *
 * Usage:
 *   ts-node scripts/migration/migrate-sk-format.ts [--dry-run]
 */

import {
  DynamoDBClient,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
  ScanCommand as DocScanCommand,
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
  userId: string;
  kind: string;
  newKind: string;
  [key: string]: unknown;
}

async function scanItemsToMigrate(): Promise<MigrationItem[]> {
  const items: MigrationItem[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new DocScanCommand({
        TableName: TABLE_NAME,
        ExclusiveStartKey: lastKey,
      }),
    );

    for (const item of result.Items ?? []) {
      const kind = item.kind as string;
      if (kind.startsWith('USER@')) {
        items.push({ ...item, userId: item.userId as string, kind, newKind: 'USER' });
      } else if (kind.startsWith('YOUTUBE_TOKEN@')) {
        items.push({ ...item, userId: item.userId as string, kind, newKind: 'YOUTUBE_TOKEN' });
      }
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

  for (const item of items) {
    console.log(`  ${item.userId} | ${item.kind} → ${item.newKind}`);

    if (dryRun) continue;

    const { kind: _oldKind, newKind, ...attrs } = item;

    await docClient.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: TABLE_NAME,
              Item: { ...attrs, kind: newKind },
            },
          },
          {
            Delete: {
              TableName: TABLE_NAME,
              Key: { userId: item.userId, kind: item.kind },
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
