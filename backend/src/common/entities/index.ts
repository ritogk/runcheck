/**
 * ============================================================
 * RunCheck データベース定義
 * ============================================================
 *
 * DynamoDB シングルテーブル設計
 * テーブル名: RunCheck
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │ Primary Key                                              │
 * │  PK: userId (HASH)                                       │
 * │  SK: kind   (RANGE)                                      │
 * ├──────────────────────────────────────────────────────────┤
 * │ GSI: EmailIndex                                          │
 * │  PK: email  (HASH)                                       │
 * ├──────────────────────────────────────────────────────────┤
 * │ GSI: KindIndex                                           │
 * │  PK: kind   (HASH)                                       │
 * └──────────────────────────────────────────────────────────┘
 *
 * 各エンティティの詳細は個別ファイルを参照
 * ============================================================
 */

export { VideoType, ReleaseKbn, OperationCd } from './enums';
export { User, UserPrimaryKey } from './user';
export { Comparison, ComparisonPrimaryKey } from './comparison';
export { YoutubeToken, YoutubePrimaryKey } from './youtube-token';
export { OperationLog, OperationLogPrimaryKey } from './operation-log';
