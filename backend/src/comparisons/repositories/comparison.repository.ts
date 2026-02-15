import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';
import type { Comparison } from '../../common/entities/base';
import type { ComparisonItem } from '../../common/entities/dynamodb';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

export type ComparisonRecord = ComparisonItem;

@Injectable()
export class ComparisonRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async create(record: Comparison): Promise<void> {
    await this.dynamodb.put({
      TableName: TABLE_NAME,
      Item: {
        ...record,
        userId: record.userId || '',
        kind: `COMPARISON@${record.id}`,
      },
    });
  }

  async findById(comparisonId: string): Promise<ComparisonRecord | null> {
    const result = await this.dynamodb.query({
      TableName: TABLE_NAME,
      IndexName: 'KindIndex',
      KeyConditionExpression: 'kind = :kind',
      ExpressionAttributeValues: { ':kind': `COMPARISON@${comparisonId}` },
    });
    return (result.Items?.[0] as ComparisonRecord) || null;
  }

  async findByUserId(userId: string): Promise<ComparisonRecord[]> {
    const result = await this.dynamodb.query({
      TableName: TABLE_NAME,
      KeyConditionExpression:
        'userId = :userId AND begins_with(kind, :prefix)',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':prefix': 'COMPARISON@',
      },
    });
    return (result.Items as ComparisonRecord[]) || [];
  }

  async deleteById(comparisonId: string, userId: string): Promise<void> {
    await this.dynamodb.delete({
      TableName: TABLE_NAME,
      Key: { userId, kind: `COMPARISON@${comparisonId}` },
    });
  }

  async publishById(comparisonId: string, userId: string): Promise<void> {
    await this.dynamodb.update({
      TableName: TABLE_NAME,
      Key: { userId, kind: `COMPARISON@${comparisonId}` },
      UpdateExpression: 'SET releaseKbn = :val, updatedAt = :now',
      ExpressionAttributeValues: {
        ':val': 1,
        ':now': new Date().toISOString(),
      },
    });
  }
}
