import { OperationCd } from './enums';

/**
 * OperationLog (global, userId="")
 *   PK = ""                SK = "OPERATION_LOG@{id}"
 *
 * incrementCount(cd) → UPDATE PK="", SK="OPERATION_LOG@{cd}"
 */
export interface OperationLog {
  id: string;          // operationCd の文字列表現
  operationCd: OperationCd;
  operationNm: string;
  executionCnt: number;
  updatedAt: string;
}

export interface OperationLogPrimaryKey {
  id: string;
}
