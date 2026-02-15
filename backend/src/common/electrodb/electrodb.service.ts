import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { Entity } from 'electrodb';
import { createDynamoDBClient, TABLE_NAME } from './client';
import { UserSchema } from './entities/user.entity';
import { ComparisonSchema } from './entities/comparison.entity';
import { YoutubeTokenSchema } from './entities/youtube-token.entity';
import { OperationLogSchema } from './entities/operation-log.entity';

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

const entityConfig = {
  table: TABLE_NAME,
} as const;

@Injectable()
export class ElectroDBService implements OnModuleInit {
  private readonly logger = new Logger(ElectroDBService.name);
  private readonly dynamoClient: DynamoDBClient;

  readonly user: Entity<string, string, string, typeof UserSchema>;
  readonly comparison: Entity<string, string, string, typeof ComparisonSchema>;
  readonly youtubeToken: Entity<
    string,
    string,
    string,
    typeof YoutubeTokenSchema
  >;
  readonly operationLog: Entity<
    string,
    string,
    string,
    typeof OperationLogSchema
  >;

  constructor() {
    this.dynamoClient = createDynamoDBClient();
    const client = this.dynamoClient;

    this.user = new Entity(UserSchema, { ...entityConfig, client });
    this.comparison = new Entity(ComparisonSchema, { ...entityConfig, client });
    this.youtubeToken = new Entity(YoutubeTokenSchema, {
      ...entityConfig,
      client,
    });
    this.operationLog = new Entity(OperationLogSchema, {
      ...entityConfig,
      client,
    });
  }

  async onModuleInit() {
    if (!process.env.DYNAMODB_ENDPOINT) return;

    const { TableNames: existing = [] } = await this.dynamoClient.send(
      new ListTablesCommand({}),
    );

    if (!existing.includes(TABLE_NAME)) {
      await this.dynamoClient.send(new CreateTableCommand(TABLE_DEFINITION));
      this.logger.log(`Created table: ${TABLE_NAME}`);
    }
  }
}
