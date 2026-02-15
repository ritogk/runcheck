import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';

const TABLE_NAME = process.env.DYNAMODB_TABLE_USERS || 'RunCheckUsers';

export interface UserRecord {
  userId: string;
  email: string;
  name: string;
  password: string;
  carType: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async create(user: UserRecord): Promise<void> {
    await this.dynamodb.put({
      TableName: TABLE_NAME,
      Item: user,
    });
  }

  async findById(userId: string): Promise<UserRecord | null> {
    const result = await this.dynamodb.get({
      TableName: TABLE_NAME,
      Key: { userId },
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
