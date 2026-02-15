import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ListTablesCommand,
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamoClient, TABLE_NAME } from './client';

const TABLE_DEFINITION: CreateTableCommandInput = {
  TableName: TABLE_NAME,
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' },
    { AttributeName: 'kind', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'kind', AttributeType: 'S' },
    { AttributeName: 'email', AttributeType: 'S' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'EmailIndex',
      KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
      Projection: { ProjectionType: 'ALL' },
    },
    {
      IndexName: 'KindIndex',
      KeySchema: [{ AttributeName: 'kind', KeyType: 'HASH' }],
      Projection: { ProjectionType: 'ALL' },
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
};

@Injectable()
export class ElectroDBService implements OnModuleInit {
  private readonly logger = new Logger(ElectroDBService.name);

  async onModuleInit() {
    if (!process.env.DYNAMODB_ENDPOINT) return;

    const { TableNames: existing = [] } = await dynamoClient.send(
      new ListTablesCommand({}),
    );

    if (!existing.includes(TABLE_NAME)) {
      await dynamoClient.send(new CreateTableCommand(TABLE_DEFINITION));
      this.logger.log(`Created table: ${TABLE_NAME}`);
    }
  }
}
