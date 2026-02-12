import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
  UpdateCommand,
  PutCommandInput,
  GetCommandInput,
  QueryCommandInput,
  DeleteCommandInput,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';

const TABLE_DEFINITIONS: CreateTableCommandInput[] = [
  {
    TableName: process.env.DYNAMODB_TABLE_USERS || 'RunCheckUsers',
    KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
  {
    TableName:
      process.env.DYNAMODB_TABLE_COMPARISONS || 'RunCheckComparisons',
    KeySchema: [{ AttributeName: 'comparisonId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'comparisonId', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'UserIdIndex',
        KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
  {
    TableName:
      process.env.DYNAMODB_TABLE_YOUTUBE_TOKENS || 'RunCheckYoutubeTokens',
    KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
  {
    TableName:
      process.env.DYNAMODB_TABLE_OPERATION_LOGS || 'RunCheckOperationLogs',
    KeySchema: [{ AttributeName: 'operationCd', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'operationCd', AttributeType: 'N' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
];

@Injectable()
export class DynamoDBService implements OnModuleInit {
  private readonly logger = new Logger(DynamoDBService.name);
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    this.client = new DynamoDBClient({
      ...(endpoint
        ? {
            endpoint,
            region: 'ap-northeast-1',
            credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
          }
        : { region: process.env.AWS_REGION || 'ap-northeast-1' }),
    });
    this.docClient = DynamoDBDocumentClient.from(this.client, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }

  async onModuleInit() {
    if (!process.env.DYNAMODB_ENDPOINT) return;

    const { TableNames: existing = [] } = await this.client.send(
      new ListTablesCommand({}),
    );

    for (const def of TABLE_DEFINITIONS) {
      if (existing.includes(def.TableName!)) continue;
      await this.client.send(new CreateTableCommand(def));
      this.logger.log(`Created table: ${def.TableName}`);
    }
  }

  async put(params: PutCommandInput) {
    return this.docClient.send(new PutCommand(params));
  }

  async get(params: GetCommandInput) {
    return this.docClient.send(new GetCommand(params));
  }

  async query(params: QueryCommandInput) {
    return this.docClient.send(new QueryCommand(params));
  }

  async delete(params: DeleteCommandInput) {
    return this.docClient.send(new DeleteCommand(params));
  }

  async update(params: UpdateCommandInput) {
    return this.docClient.send(new UpdateCommand(params));
  }
}
