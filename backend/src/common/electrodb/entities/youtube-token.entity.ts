import { Schema, EntityItem, Entity } from 'electrodb';
import { entityConfig } from '../client';

export const YoutubeTokenEntity = new Entity({
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
}, entityConfig);
export type YoutubeTokenAttributes = EntityItem<typeof YoutubeTokenEntity>;
