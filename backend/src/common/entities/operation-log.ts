import { OperationCd } from './enums';

export interface OperationLog {
  id: string;
  operationCd: OperationCd;
  operationNm: string;
  executionCnt: number;
  updatedAt: string;
}

export interface OperationLogPrimaryKey {
  id: string;
}
