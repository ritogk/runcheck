import { Schema } from 'electrodb';

export const ComparisonSchema: Schema<string, string, string> = {
  model: {
    entity: 'Comparison',
    version: '1',
    service: 'runcheck',
  },
  attributes: {
    id: { type: 'string', required: true },
    userId: { type: 'string', required: true },
    title: { type: 'string' },
    memo: { type: 'string' },
    category: { type: 'string' },
    video1Url: { type: 'string', required: true },
    video1TimeSt: { type: 'number', required: true },
    video1VideoType: { type: 'number', required: true },
    video2Url: { type: 'string', required: true },
    video2TimeSt: { type: 'number', required: true },
    video2VideoType: { type: 'number', required: true },
    releaseKbn: { type: 'number', required: true },
    anonymous: { type: 'boolean', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
  },
  indexes: {
    primary: {
      pk: { field: 'userId', composite: ['userId'] },
      sk: { field: 'kind', composite: ['id'], template: 'COMPARISON@${id}' },
    },
    byKind: {
      index: 'KindIndex',
      pk: { field: 'kind', composite: ['id'], template: 'COMPARISON@${id}' },
    },
  },
};
