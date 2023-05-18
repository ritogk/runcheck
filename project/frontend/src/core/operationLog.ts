import { OperationLogApi, OperationCd } from "@/core/openapiClient"

const operationLogApi = new OperationLogApi()

const send = (operationCd: OperationCd) => {
  operationLogApi.operationLogPut({
    requestOperationLog: { operationCd: operationCd },
  })
}

export const operationLog = {
  send: send,
  OPERATION_CD: OperationCd,
}
