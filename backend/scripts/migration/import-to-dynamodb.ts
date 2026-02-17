/**
 * MySQL エクスポートデータ → DynamoDB インポートスクリプト
 *
 * ElectroDB エンティティを使用してデータを書き込むため、
 * PK/SK の自動生成、型検証、内部メタデータ (__edb_e__, __edb_v__) の付与が行われる。
 *
 * 使い方:
 *   1. export-mysql.sh で生成した exported_data/ をこのスクリプトと同じ階層に配置
 *   2. AWS認証情報を設定 (AWS_PROFILE, AWS_REGION など)
 *   3. npx ts-node scripts/migration/import-to-dynamodb.ts
 *
 * オプション:
 *   --dry-run   実際には書き込まず、変換結果を表示
 *   --data-dir  エクスポートデータのディレクトリ (デフォルト: scripts/migration/exported_data)
 *
 * 環境変数:
 *   DYNAMODB_ENDPOINT     ローカルDynamoDB用 (例: http://localhost:8000)
 *   DYNAMODB_TABLE_NAME   テーブル名 (デフォルト: RunCheck)
 *   AWS_REGION            AWSリージョン (デフォルト: ap-northeast-1)
 */

import { ulid } from 'ulid';
import * as fs from 'fs';
import * as path from 'path';
import { UserEntity } from '../../src/common/electrodb/entities/user.entity';
import {
  ComparisonEntity,
  VideoType,
  ReleaseKbn,
} from '../../src/common/electrodb/entities/comparison.entity';
import { YoutubeTokenEntity } from '../../src/common/electrodb/entities/youtube-token.entity';
import {
  OperationLogEntity,
  OperationCd,
} from '../../src/common/electrodb/entities/operation-log.entity';

// =============================================
// 設定
// =============================================
const DRY_RUN = process.argv.includes('--dry-run');
const DATA_DIR =
  process.argv.find((a) => a.startsWith('--data-dir='))?.split('=')[1] ||
  path.join(__dirname, 'exported_data');

const CONCURRENCY = 10;

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

/** video_type 文字列 → ElectroDB enum 文字列変換 */
function videoTypeToString(type: string): VideoType {
  switch (type) {
    case 'youtube':
      return VideoType.YOUTUBE;
    case 'local':
      return VideoType.LOCAL;
    default:
      return VideoType.YOUTUBE;
  }
}

/** 同時実行数を制限しながら非同期タスクを実行 */
async function runWithConcurrency(
  tasks: (() => Promise<unknown>)[],
  concurrency: number,
  label: string,
): Promise<{ successes: number; failures: number }> {
  let successes = 0;
  let failures = 0;
  let completed = 0;

  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency);
    const results = await Promise.allSettled(batch.map((t) => t()));
    for (const result of results) {
      completed++;
      if (result.status === 'fulfilled') {
        successes++;
      } else {
        failures++;
        console.error(`\n  Error: ${result.reason}`);
      }
    }
    process.stdout.write(`\r  ${label}: ${completed}/${tasks.length}`);
  }
  if (tasks.length > 0) console.log('');
  return { successes, failures };
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
  console.log('=== MySQL → DynamoDB Import (ElectroDB) ===');
  console.log(`Data directory: ${DATA_DIR}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log('');

  // MySQL user.id → DynamoDB userId (ULID) のマッピング
  const userIdMap = new Map<number, string>();

  // ----- 1. Users -----
  console.log('--- Users ---');
  const mysqlUsers = readJsonl<MysqlUser>(path.join(DATA_DIR, 'users.jsonl'));
  console.log(`  Read ${mysqlUsers.length} records from users.jsonl`);

  const userData = mysqlUsers.map((u) => {
    const newUserId = ulid();
    userIdMap.set(u.id, newUserId);
    return {
      id: newUserId,
      email: u.email,
      name: u.name,
      password: u.password,
      carType: u.car_type || '',
      createdAt: u.created_at || u.updated_at || new Date().toISOString(),
      updatedAt: u.updated_at || new Date().toISOString(),
    };
  });

  if (DRY_RUN) {
    if (userData.length > 0) {
      console.log('  Sample:', JSON.stringify(userData[0], null, 2));
    }
    console.log(`  [DRY RUN] Would write ${userData.length} users`);
  } else {
    const tasks = userData.map((data) => () => UserEntity.put(data).go());
    const result = await runWithConcurrency(tasks, CONCURRENCY, 'Users');
    console.log(`  Users: ${result.successes} succeeded, ${result.failures} failed`);
  }

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

  const compData = mysqlComps.map((c) => {
    const comparisonId = ulid();
    const userId = c.user_id ? userIdMap.get(c.user_id) || 'ANONYMOUS' : 'ANONYMOUS';
    const releaseKbnVal = c.release_kbn ?? 0;
    return {
      id: comparisonId,
      userId,
      title: c.title || '',
      memo: c.memo || '',
      category: c.category || '',
      video1Url: c.video1_url || '',
      video1TimeSt: c.video1_time_st || 0,
      video1VideoType: videoTypeToString(c.video1_type),
      video2Url: c.video2_url || '',
      video2TimeSt: c.video2_time_st || 0,
      video2VideoType: videoTypeToString(c.video2_type),
      releaseKbn: (releaseKbnVal === 0 ? '0' : '1') as ReleaseKbn,
      anonymous: c.anonymous === 1,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    };
  });

  if (DRY_RUN) {
    if (compData.length > 0) {
      console.log('  Sample:', JSON.stringify(compData[0], null, 2));
    }
    console.log(`  [DRY RUN] Would write ${compData.length} comparisons`);
  } else {
    const tasks = compData.map((data) => () => ComparisonEntity.put(data).go());
    const result = await runWithConcurrency(tasks, CONCURRENCY, 'Comparisons');
    console.log(`  Comparisons: ${result.successes} succeeded, ${result.failures} failed`);
  }
  console.log('');

  // ----- 3. YouTube Tokens -----
  console.log('--- YouTube Tokens ---');
  const mysqlTokens = readJsonl<MysqlYoutubeToken>(
    path.join(DATA_DIR, 'youtube_tokens.jsonl'),
  );
  console.log(
    `  Read ${mysqlTokens.length} records from youtube_tokens.jsonl`,
  );

  const tokenData = mysqlTokens.map((t) => {
    const userId = userIdMap.get(t.user_id);
    if (!userId) {
      console.warn(`  Warning: Unknown user_id ${t.user_id} for youtube_token, skipping.`);
    }
    return {
      userId: userId || 'UNKNOWN',
      refreshToken: t.refresh_token,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    };
  });

  if (DRY_RUN) {
    if (tokenData.length > 0) {
      console.log('  Sample:', JSON.stringify(tokenData[0], null, 2));
    }
    console.log(`  [DRY RUN] Would write ${tokenData.length} youtube tokens`);
  } else {
    const tasks = tokenData.map((data) => () => YoutubeTokenEntity.put(data).go());
    const result = await runWithConcurrency(tasks, CONCURRENCY, 'YouTube Tokens');
    console.log(`  YouTube Tokens: ${result.successes} succeeded, ${result.failures} failed`);
  }
  console.log('');

  // ----- 4. Operation Logs -----
  console.log('--- Operation Logs ---');
  const mysqlLogs = readJsonl<MysqlOperationLog>(
    path.join(DATA_DIR, 'operation_logs.jsonl'),
  );
  console.log(
    `  Read ${mysqlLogs.length} records from operation_logs.jsonl`,
  );

  const logData = mysqlLogs.map((l) => {
    const logId = String(l.operation_cd);
    return {
      id: logId,
      operationCd: String(l.operation_cd) as OperationCd,
      operationNm: l.operation_nm,
      executionCnt: l.execution_cnt || 0,
      updatedAt: l.updated_at,
    };
  });

  if (DRY_RUN) {
    if (logData.length > 0) {
      console.log('  Sample:', JSON.stringify(logData[0], null, 2));
    }
    console.log(`  [DRY RUN] Would write ${logData.length} operation logs`);
  } else {
    const tasks = logData.map((data) => () => OperationLogEntity.put(data).go());
    const result = await runWithConcurrency(tasks, CONCURRENCY, 'Operation Logs');
    console.log(`  Operation Logs: ${result.successes} succeeded, ${result.failures} failed`);
  }
  console.log('');

  // ----- Summary -----
  console.log('=== Import complete ===');
  console.log(`  Users:          ${mysqlUsers.length}`);
  console.log(`  Comparisons:    ${mysqlComps.length}`);
  console.log(`  YouTube Tokens: ${mysqlTokens.length}`);
  console.log(`  Operation Logs: ${mysqlLogs.length}`);

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
