import { Schema } from 'electrodb';

export const OperationLogSchema: Schema<string, string, string> = {
  model: {
    entity: 'OperationLog',
    version: '1',
    service: 'runcheck',
  },
  attributes: {
    id: { type: 'string', required: true },
    operationCd: { type: 'number', required: true },
    operationNm: { type: 'string', required: true },
    executionCnt: { type: 'number', required: true },
    updatedAt: { type: 'string', required: true },
  },
  indexes: {
    primary: {
      pk: { field: 'userId', composite: [], template: '' },
      sk: {
        field: 'kind',
        composite: ['id'],
        template: 'OPERATION_LOG@${id}',
      },
    },
  },
};
