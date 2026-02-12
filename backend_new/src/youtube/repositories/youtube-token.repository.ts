import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';

const TABLE_NAME = process.env.DYNAMODB_TABLE_YOUTUBE_TOKENS || 'RunCheckYoutubeTokens';

export interface YoutubeTokenRecord {
  userId: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class YoutubeTokenRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async save(record: YoutubeTokenRecord): Promise<void> {
    await this.dynamodb.put({
      TableName: TABLE_NAME,
      Item: record,
    });
  }

  async findByUserId(userId: string): Promise<YoutubeTokenRecord | null> {
    const result = await this.dynamodb.get({
      TableName: TABLE_NAME,
      Key: { userId },
    });
    return (result.Item as YoutubeTokenRecord) || null;
  }
}
