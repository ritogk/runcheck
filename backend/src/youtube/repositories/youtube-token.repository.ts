import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';
import type { YoutubeToken } from '../../common/entities/base';
import type { YoutubeTokenItem } from '../../common/entities/dynamodb';
import { toYoutubeTokenKey } from '../../common/entities/dynamodb';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

export type YoutubeTokenRecord = YoutubeTokenItem;

@Injectable()
export class YoutubeTokenRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async save(record: YoutubeToken): Promise<void> {
    await this.dynamodb.put({
      TableName: TABLE_NAME,
      Item: { ...record, ...toYoutubeTokenKey({ id: record.id, userId: record.userId }) },
    });
  }

  async findByUserId(userId: string): Promise<YoutubeTokenRecord | null> {
    const result = await this.dynamodb.query({
      TableName: TABLE_NAME,
      KeyConditionExpression:
        'userId = :userId AND begins_with(kind, :prefix)',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':prefix': 'YOUTUBE_TOKEN@',
      },
    });
    return (result.Items?.[0] as YoutubeTokenRecord) || null;
  }
}
