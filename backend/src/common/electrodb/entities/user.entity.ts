import { Schema, EntityItem, Entity } from 'electrodb';
import { entityConfig } from '../client';

export const UserEntity = new Entity({
  model: {
    entity: 'User',
    version: '1',
    service: 'runcheck',
  },
  attributes: {
    id: { type: 'string', required: true },
    email: { type: 'string', required: true },
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    carType: { type: 'string', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
  },
  indexes: {
    primary: {
      pk: { field: 'userId', composite: ['id'], template: '${id}', casing: 'none' },
      sk: { field: 'kind', composite: [], template: 'user', casing: 'none' },
    },
    byEmail: {
      index: 'EmailIndex',
      pk: { field: 'email', composite: ['email'], template: '${email}', casing: 'none' },
    },
  },
}, entityConfig);
export type UserAttributes = EntityItem<typeof UserEntity>;
