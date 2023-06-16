import { OperationLogApi, OperationCd } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"

const operationLogApi = new OperationLogApi(apiConfig)

const send = (operationCd: OperationCd) => {
  operationLogApi.operationLogPut({
    requestOperationLog: { operationCd: operationCd },
  })
}

export const operationLog = {
  send: send,
  OPERATION_CD: OperationCd,
}
