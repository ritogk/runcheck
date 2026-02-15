/**
 * MySQL エクスポートデータ → DynamoDB インポートスクリプト
 *
 * 使い方:
 *   1. export-mysql.sh で生成した exported_data/ をこのスクリプトと同じ階層に配置
 *   2. AWS認証情報を設定 (AWS_PROFILE, AWS_REGION など)
 *   3. npx ts-node scripts/migration/import-to-dynamodb.ts
 *
 * オプション:
 *   --dry-run   実際には書き込まず、変換結果を表示
 *   --data-dir  エクスポートデータのディレクトリ (デフォルト: scripts/migration/exported_data)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { ulid } from 'ulid';
import * as fs from 'fs';
import * as path from 'path';
// Key helpers inlined (previously from entities/dynamodb.ts, now deleted)
const toUserKey = (pk: { id: string }) => ({
  userId: pk.id,
  kind: `USER`,
});
const toComparisonKey = (pk: { id: string; userId: string }) => ({
  userId: pk.userId,
  kind: `COMPARISON@${pk.id}`,
});
const toYoutubeTokenKey = (pk: { id: string; userId: string }) => ({
  userId: pk.userId,
  kind: `YOUTUBE_TOKEN`,
});
const toOperationLogKey = (pk: { id: string }) => ({
  userId: '',
  kind: `OPERATION_LOG@${pk.id}`,
});

// =============================================
// 設定
// =============================================
const REGION = process.env.AWS_REGION || 'ap-northeast-1';
const DRY_RUN = process.argv.includes('--dry-run');
const DATA_DIR =
  process.argv.find((a) => a.startsWith('--data-dir='))?.split('=')[1] ||
  path.join(__dirname, 'exported_data');

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

// =============================================
// DynamoDB クライアント
// =============================================
const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT;
const clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = {
  region: REGION,
};
if (DYNAMODB_ENDPOINT) {
  clientConfig.endpoint = DYNAMODB_ENDPOINT;
  clientConfig.credentials = { accessKeyId: 'local', secretAccessKey: 'local' };
}
const client = new DynamoDBClient(clientConfig);
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// =============================================
// ユーティリティ
// =============================================

/** JSONL ファイルを1行ずつパースして配列で返す */
function readJsonl<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) {
    console.warn(`  File not found: ${filePath}, skipping.`);
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf-8').trim();
  if (!content) return [];
  return content
    .split('\n')
    .filter((line) => line.startsWith('{'))
    .map((line) => JSON.parse(line));
}

/** video_type 文字列 → 数値変換 */
function videoTypeToNumber(type: string): number {
  switch (type) {
    case 'youtube':
      return 1;
    case 'local':
      return 2;
    default:
      return 1;
  }
}

/** DynamoDB BatchWrite (25件ずつ) */
async function batchWrite(
  items: Record<string, unknown>[],
): Promise<void> {
  const BATCH_SIZE = 25;
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const putRequests = batch.map((item) => ({
      PutRequest: { Item: item },
    }));

    if (DRY_RUN) {
      console.log(
        `  [DRY RUN] Would write ${batch.length} items to ${TABLE_NAME}`,
      );
      continue;
    }

    await docClient.send(
      new BatchWriteCommand({
        RequestItems: { [TABLE_NAME]: putRequests },
      }),
    );
    process.stdout.write(
      `\r  Writing to ${TABLE_NAME}: ${Math.min(i + BATCH_SIZE, items.length)}/${items.length}`,
    );
  }
  if (!DRY_RUN) console.log('');
}

// =============================================
// MySQL → DynamoDB の型定義
// =============================================
interface MysqlUser {
  id: number;
  name: string;
  email: string;
  password: string;
  car_type: string;
  created_at: string;
  updated_at: string;
}

interface MysqlComparison {
  id: number;
  user_id: number | null;
  title: string;
  memo: string;
  category: string;
  video1_url: string;
  video1_time_st: number;
  video1_type: string;
  video2_url: string;
  video2_time_st: number;
  video2_type: string;
  release_kbn: number;
  anonymous: number;
  created_at: string;
  updated_at: string;
}

interface MysqlYoutubeToken {
  user_id: number;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

interface MysqlOperationLog {
  operation_cd: number;
  operation_nm: string;
  execution_cnt: number;
  updated_at: string;
}

// =============================================
// メイン処理
// =============================================
async function main() {
  console.log('=== MySQL → DynamoDB Import (Single Table) ===');
  console.log(`Data directory: ${DATA_DIR}`);
  console.log(`Table: ${TABLE_NAME}`);
  console.log(`Region: ${REGION}`);
  console.log(`Endpoint: ${DYNAMODB_ENDPOINT || 'AWS (default)'}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log('');

  // MySQL user.id → DynamoDB userId (ULID) のマッピング
  const userIdMap = new Map<number, string>();

  // ----- 1. Users -----
  console.log('--- Users ---');
  const mysqlUsers = readJsonl<MysqlUser>(path.join(DATA_DIR, 'users.jsonl'));
  console.log(`  Read ${mysqlUsers.length} records from users.jsonl`);

  const dynamoUsers = mysqlUsers.map((u) => {
    const newUserId = ulid();
    userIdMap.set(u.id, newUserId);
    return {
      ...toUserKey({ id: newUserId }),
      id: newUserId,
      email: u.email,
      name: u.name,
      password: u.password,
      carType: u.car_type || '',
      createdAt: u.created_at,
      updatedAt: u.updated_at,
    };
  });

  if (DRY_RUN && dynamoUsers.length > 0) {
    console.log('  Sample:', JSON.stringify(dynamoUsers[0], null, 2));
  }
  await batchWrite(dynamoUsers);
  console.log(`  Users: ${dynamoUsers.length} records imported`);

  // IDマッピングをファイルに保存 (デバッグ・参照用)
  const mappingPath = path.join(DATA_DIR, 'user_id_mapping.json');
  const mappingObj: Record<string, string> = {};
  userIdMap.forEach((newId, oldId) => {
    mappingObj[String(oldId)] = newId;
  });
  fs.writeFileSync(mappingPath, JSON.stringify(mappingObj, null, 2));
  console.log(`  ID mapping saved to ${mappingPath}`);
  console.log('');

  // ----- 2. Comparisons -----
  console.log('--- Comparisons ---');
  const mysqlComps = readJsonl<MysqlComparison>(
    path.join(DATA_DIR, 'comparisons.jsonl'),
  );
  console.log(`  Read ${mysqlComps.length} records from comparisons.jsonl`);

  const dynamoComps = mysqlComps.map((c) => {
    const comparisonId = ulid();
    const userId = c.user_id ? userIdMap.get(c.user_id) || '' : '';
    return {
      ...toComparisonKey({ id: comparisonId, userId }),
      id: comparisonId,
      title: c.title || '',
      memo: c.memo || '',
      category: c.category || '',
      video1Url: c.video1_url || '',
      video1TimeSt: c.video1_time_st || 0,
      video1VideoType: videoTypeToNumber(c.video1_type),
      video2Url: c.video2_url || '',
      video2TimeSt: c.video2_time_st || 0,
      video2VideoType: videoTypeToNumber(c.video2_type),
      releaseKbn: c.release_kbn || 0,
      anonymous: c.anonymous === 1,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    };
  });

  if (DRY_RUN && dynamoComps.length > 0) {
    console.log('  Sample:', JSON.stringify(dynamoComps[0], null, 2));
  }
  await batchWrite(dynamoComps);
  console.log(`  Comparisons: ${dynamoComps.length} records imported`);
  console.log('');

  // ----- 3. YouTube Tokens -----
  console.log('--- YouTube Tokens ---');
  const mysqlTokens = readJsonl<MysqlYoutubeToken>(
    path.join(DATA_DIR, 'youtube_tokens.jsonl'),
  );
  console.log(
    `  Read ${mysqlTokens.length} records from youtube_tokens.jsonl`,
  );

  const dynamoTokens = mysqlTokens.map((t) => {
    const userId = userIdMap.get(t.user_id) || '';
    const tokenId = ulid();
    return {
      ...toYoutubeTokenKey({ id: tokenId, userId }),
      id: tokenId,
      refreshToken: t.refresh_token,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    };
  });

  if (DRY_RUN && dynamoTokens.length > 0) {
    console.log('  Sample:', JSON.stringify(dynamoTokens[0], null, 2));
  }
  await batchWrite(dynamoTokens);
  console.log(`  YouTube Tokens: ${dynamoTokens.length} records imported`);
  console.log('');

  // ----- 4. Operation Logs -----
  console.log('--- Operation Logs ---');
  const mysqlLogs = readJsonl<MysqlOperationLog>(
    path.join(DATA_DIR, 'operation_logs.jsonl'),
  );
  console.log(
    `  Read ${mysqlLogs.length} records from operation_logs.jsonl`,
  );

  const dynamoLogs = mysqlLogs.map((l) => {
    const logId = String(l.operation_cd);
    return {
      ...toOperationLogKey({ id: logId }),
      id: logId,
      operationCd: l.operation_cd,
      operationNm: l.operation_nm,
      executionCnt: l.execution_cnt || 0,
      updatedAt: l.updated_at,
    };
  });

  if (DRY_RUN && dynamoLogs.length > 0) {
    console.log('  Sample:', JSON.stringify(dynamoLogs[0], null, 2));
  }
  await batchWrite(dynamoLogs);
  console.log(`  Operation Logs: ${dynamoLogs.length} records imported`);
  console.log('');

  // ----- Summary -----
  console.log('=== Import complete ===');
  console.log(`  Users:          ${dynamoUsers.length}`);
  console.log(`  Comparisons:    ${dynamoComps.length}`);
  console.log(`  YouTube Tokens: ${dynamoTokens.length}`);
  console.log(`  Operation Logs: ${dynamoLogs.length}`);

  if (DRY_RUN) {
    console.log('');
    console.log(
      '(DRY RUN mode - no data was written. Remove --dry-run to execute.)',
    );
  }
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
