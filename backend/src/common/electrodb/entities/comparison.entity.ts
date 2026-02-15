import { Schema, EntityItem, Entity } from 'electrodb';
import { entityConfig } from '../client';

export enum VideoType {
  YOUTUBE = "1",
  LOCAL = "2",
}
const videoTypes = Object.values(VideoType) as [VideoType, ...VideoType[]];

export enum ReleaseKbn {
  PRIVATE = "0",
  PUBLIC = "1",
}
const releaseKbns = Object.values(ReleaseKbn) as [ReleaseKbn, ...ReleaseKbn[]];

export const ComparisonEntity = new Entity({
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
    video1VideoType: {
      type: videoTypes,
      required: true,
    },
    video2Url: { type: 'string', required: true },
    video2TimeSt: { type: 'number', required: true },
    video2VideoType: {
      type: videoTypes,
      required: true,
    },
    releaseKbn: {
      type: releaseKbns,
      required: true,
    },
    anonymous: { type: 'boolean', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
  },
  indexes: {
    primary: {
      pk: { field: 'userId', composite: ['userId'], template: '${userId}', casing: 'none' },
      sk: { field: 'kind', composite: ['id'], template: 'comparison@${id}', casing: 'none' },
    },
    byKind: {
      index: 'KindIndex',
      pk: { field: 'kind', composite: ['id'], template: 'comparison@${id}', casing: 'none' },
    },
  },
}, entityConfig);
export type ComparisonAttributes = EntityItem<typeof ComparisonEntity>;
