import { Schema } from 'electrodb';

export const YoutubeTokenSchema: Schema<string, string, string> = {
  model: {
    entity: 'YoutubeToken',
    version: '1',
    service: 'runcheck',
  },
  attributes: {
    userId: { type: 'string', required: true },
    refreshToken: { type: 'string', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
  },
  indexes: {
    primary: {
      pk: { field: 'userId', composite: ['userId'] },
      sk: { field: 'kind', composite: [], template: 'YOUTUBE_TOKEN' },
    },
  },
};
