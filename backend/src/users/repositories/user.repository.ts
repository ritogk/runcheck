import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';
import type { User } from '../../common/entities/base';
import type { UserItem } from '../../common/entities/dynamodb';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

export type UserRecord = UserItem;

@Injectable()
export class UserRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async create(user: User): Promise<void> {
    await this.dynamodb.put({
      TableName: TABLE_NAME,
      Item: { ...user, userId: user.id, kind: `USER@${user.id}` },
    });
  }

  async findById(userId: string): Promise<UserRecord | null> {
    const result = await this.dynamodb.get({
      TableName: TABLE_NAME,
      Key: { userId, kind: `USER@${userId}` },
    });
    return (result.Item as UserRecord) || null;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const result = await this.dynamodb.query({
      TableName: TABLE_NAME,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    });
    return (result.Items?.[0] as UserRecord) || null;
  }
}
