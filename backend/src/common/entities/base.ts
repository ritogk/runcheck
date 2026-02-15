/**
 * RDSライクなエンティティ定義
 * リレーショナルDB的にテーブルのカラムを表現する型
 */

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  carType: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserPrimaryKey {
  id: string
}

export interface Comparison {
  id: string;
  userId: string;
  title?: string;
  memo?: string;
  category?: string;
  video1Url: string;
  video1TimeSt: number;
  video1VideoType: number;
  video2Url: string;
  video2TimeSt: number;
  video2VideoType: number;
  releaseKbn: number;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ComparisonPrimaryKey {
  id: string
  userId: string
}

export interface YoutubeToken {
  id: string;
  userId: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}
export interface YoutubePrimaryKey {
  id: string
  userId: string
}

export interface OperationLog {
  id: string;
  operationCd: number;
  operationNm: string;
  executionCnt: number;
  updatedAt: string;
}
export interface OperationLogPrimaryKey {
  id: string
}