/**
 * DynamoDB シングルテーブル用エンティティ定義
 * ベースのRDSライク型を拡張し、PK(userId) + SK(kind) を付与
 */

import {
  User,
  UserPrimaryKey,
  Comparison,
  ComparisonPrimaryKey,
  YoutubeToken,
  YoutubePrimaryKey,
  OperationLog,
  OperationLogPrimaryKey,
} from './base';

/** DynamoDB共通キー: PK=userId, SK=kind */
export interface DynamoDBKey {
  userId: string;
  kind: string;
}

export type UserItem = User & DynamoDBKey;
export type ComparisonItem = Comparison & DynamoDBKey;
export type YoutubeTokenItem = YoutubeToken & DynamoDBKey;
export type OperationLogItem = OperationLog & DynamoDBKey;

/** PrimaryKey → DynamoDB Key 変換 */
export function toUserKey(pk: UserPrimaryKey): DynamoDBKey {
  return { userId: pk.id, kind: `USER@${pk.id}` };
}

export function toComparisonKey(pk: ComparisonPrimaryKey): DynamoDBKey {
  return { userId: pk.userId, kind: `COMPARISON@${pk.id}` };
}

export function toYoutubeTokenKey(pk: YoutubePrimaryKey): DynamoDBKey {
  return { userId: pk.userId, kind: `YOUTUBE_TOKEN@${pk.id}` };
}

export function toOperationLogKey(pk: OperationLogPrimaryKey): DynamoDBKey {
  return { userId: '', kind: `OPERATION_LOG@${pk.id}` };
}
