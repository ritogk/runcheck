import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';

const TABLE_NAME = process.env.DYNAMODB_TABLE_COMPARISONS || 'RunCheckComparisons';

export interface ComparisonRecord {
  comparisonId: string;
  userId?: string;
  title?: string;
  memo?: string;
  category?: string;
  video1Url: string;
  video1TimeSt: number;
  video1VideoType: number;
  video2Url: string;
  video2TimeSt: number;
  video2VideoType: number;
  releaseKbn: number;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ComparisonRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async create(record: ComparisonRecord): Promise<void> {
    await this.dynamodb.put({
      TableName: TABLE_NAME,
      Item: record,
    });
  }

  async findById(comparisonId: string): Promise<ComparisonRecord | null> {
    const result = await this.dynamodb.get({
      TableName: TABLE_NAME,
      Key: { comparisonId },
    });
    return (result.Item as ComparisonRecord) || null;
  }

  async findByUserId(userId: string): Promise<ComparisonRecord[]> {
    const result = await this.dynamodb.query({
      TableName: TABLE_NAME,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    });
    return (result.Items as ComparisonRecord[]) || [];
  }

  async deleteById(comparisonId: string): Promise<void> {
    await this.dynamodb.delete({
      TableName: TABLE_NAME,
      Key: { comparisonId },
    });
  }

  async publishById(comparisonId: string): Promise<void> {
    await this.dynamodb.update({
      TableName: TABLE_NAME,
      Key: { comparisonId },
      UpdateExpression: 'SET releaseKbn = :val, updatedAt = :now',
      ExpressionAttributeValues: {
        ':val': 1,
        ':now': new Date().toISOString(),
      },
    });
  }
}
