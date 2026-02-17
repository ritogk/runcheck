/**
 * DynamoDB テーブルリネーム移行スクリプト
 *
 * 全アイテムをソーステーブルからターゲットテーブルにコピーする。
 * ターゲットテーブルは事前に CDK deploy で作成済みであること。
 *
 * Usage:
 *   ts-node scripts/migration/rename-table.ts --source RunCheck --target RunCheck-prod [--dry-run]
 */

import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

function getArg(name: string): string {
  const idx = args.indexOf(name);
  if (idx === -1 || idx + 1 >= args.length) {
    throw new Error(`Required argument: ${name} <value>`);
  }
  return args[idx + 1];
}

const sourceTable = getArg('--source');
const targetTable = getArg('--target');
const region = process.env.AWS_REGION || 'ap-northeast-1';

const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

async function migrate() {
  console.log(`Migration mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Source: ${sourceTable}`);
  console.log(`Target: ${targetTable}`);
  console.log(`Region: ${region}\n`);

  let lastKey: Record<string, unknown> | undefined;
  let totalScanned = 0;
  let totalWritten = 0;

  do {
    const result = await docClient.send(
      new ScanCommand({
        TableName: sourceTable,
        ExclusiveStartKey: lastKey,
      }),
    );

    const items = result.Items ?? [];
    totalScanned += items.length;

    if (items.length === 0) {
      lastKey = result.LastEvaluatedKey;
      continue;
    }

    // BatchWrite は最大25件ずつ
    for (let i = 0; i < items.length; i += 25) {
      const batch = items.slice(i, i + 25);

      console.log(`  Writing ${batch.length} items (total scanned: ${totalScanned})...`);

      if (!dryRun) {
        await docClient.send(
          new BatchWriteCommand({
            RequestItems: {
              [targetTable]: batch.map((item) => ({
                PutRequest: { Item: item },
              })),
            },
          }),
        );
      }

      totalWritten += batch.length;
    }

    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  console.log(`\nMigration ${dryRun ? 'preview' : 'completed'}: ${totalWritten} items copied.`);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
