/**
 * DynamoDB シングルテーブル用エンティティ定義
 * ベースのRDSライク型を拡張し、PK(userId) + SK(kind) を付与
 */

import { User, Comparison, YoutubeToken, OperationLog } from './base';

/** DynamoDB共通キー: PK=userId, SK=kind */
interface DynamoDBKey {
  userId: string;
  kind: string;
}

/** USER@{id} */
export type UserItem = User & DynamoDBKey;

/** COMPARISON@{id} — userId は PK として必須（匿名なら空文字列） */
export type ComparisonItem = Comparison & DynamoDBKey;

/** YOUTUBE_TOKEN@{userId} */
export type YoutubeTokenItem = YoutubeToken & DynamoDBKey;

/** OPERATION_LOG@{operationCd} — userId は常に空文字列 */
export type OperationLogItem = OperationLog & DynamoDBKey;
