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
  BatchWriteCommand,
  BatchGetCommand,
  PutCommandInput,
  GetCommandInput,
  QueryCommandInput,
  DeleteCommandInput,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';

const TABLE_DEFINITIONS: CreateTableCommandInput[] = [
  {
    TableName: process.env.DYNAMODB_TABLE_NAME || 'RunCheck',
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
    return this.executeWithRetry('put', () =>
      this.docClient.send(new PutCommand(params)),
    );
  }

  async get(params: GetCommandInput) {
    return this.executeWithRetry('get', () =>
      this.docClient.send(new GetCommand(params)),
    );
  }

  async query(params: QueryCommandInput) {
    return this.executeWithRetry('query', () =>
      this.docClient.send(new QueryCommand(params)),
    );
  }

  async delete(params: DeleteCommandInput) {
    return this.executeWithRetry('delete', () =>
      this.docClient.send(new DeleteCommand(params)),
    );
  }

  async update(params: UpdateCommandInput) {
    return this.executeWithRetry('update', () =>
      this.docClient.send(new UpdateCommand(params)),
    );
  }

  async batchWrite(
    tableName: string,
    writeRequests: Record<string, unknown>[],
  ) {
    const chunks: Record<string, unknown>[][] = [];
    for (let i = 0; i < writeRequests.length; i += 25) {
      chunks.push(writeRequests.slice(i, i + 25));
    }

    for (const chunk of chunks) {
      let unprocessed: Record<string, unknown>[] | undefined = chunk;

      for (let attempt = 0; attempt < 3; attempt++) {
        const result = await this.executeWithRetry('batchWrite', () =>
          this.docClient.send(
            new BatchWriteCommand({
              RequestItems: { [tableName]: unprocessed as any },
            }),
          ),
        );

        const remaining = result.UnprocessedItems?.[tableName];
        if (!remaining || remaining.length === 0) {
          unprocessed = undefined;
          break;
        }

        unprocessed = remaining as Record<string, unknown>[];
        this.logger.warn(
          `batchWrite: ${remaining.length} unprocessed items, retry ${attempt + 1}/3`,
        );
        await this.sleep(100 * Math.pow(2, attempt));
      }

      if (unprocessed && unprocessed.length > 0) {
        throw new Error(
          `batchWrite failed: ${unprocessed.length} items remain unprocessed in table ${tableName}`,
        );
      }
    }
  }

  async batchGet(
    tableName: string,
    keys: Record<string, unknown>[],
  ): Promise<Record<string, unknown>[]> {
    const chunks: Record<string, unknown>[][] = [];
    for (let i = 0; i < keys.length; i += 100) {
      chunks.push(keys.slice(i, i + 100));
    }

    const allResults: Record<string, unknown>[] = [];

    for (const chunk of chunks) {
      let unprocessedKeys: Record<string, unknown>[] | undefined = chunk;

      for (let attempt = 0; attempt < 3; attempt++) {
        const result = await this.executeWithRetry('batchGet', () =>
          this.docClient.send(
            new BatchGetCommand({
              RequestItems: {
                [tableName]: { Keys: unprocessedKeys as any },
              },
            }),
          ),
        );

        const items = result.Responses?.[tableName] ?? [];
        allResults.push(...(items as Record<string, unknown>[]));

        const remaining = result.UnprocessedKeys?.[tableName]?.Keys;
        if (!remaining || remaining.length === 0) {
          unprocessedKeys = undefined;
          break;
        }

        unprocessedKeys = remaining as Record<string, unknown>[];
        this.logger.warn(
          `batchGet: ${remaining.length} unprocessed keys, retry ${attempt + 1}/3`,
        );
        await this.sleep(100 * Math.pow(2, attempt));
      }

      if (unprocessedKeys && unprocessedKeys.length > 0) {
        this.logger.error(
          `batchGet: ${unprocessedKeys.length} keys remain unprocessed in table ${tableName}`,
        );
      }
    }

    return allResults;
  }

  private async executeWithRetry<T>(
    operationName: string,
    operation: () => Promise<T>,
    maxRetries = 2,
  ): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt < maxRetries && this.isRetryableError(error)) {
          const delayMs = 100 * Math.pow(2, attempt);
          this.logger.warn(
            `${operationName} failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delayMs}ms: ${error instanceof Error ? error.message : error}`,
          );
          await this.sleep(delayMs);
          continue;
        }

        this.logger.error(
          `${operationName} failed after ${attempt + 1} attempt(s): ${error instanceof Error ? error.message : error}`,
          error instanceof Error ? error.stack : undefined,
        );
        throw error;
      }
    }

    throw new Error(`${operationName}: unreachable`);
  }

  private isRetryableError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const name = (error as any).name ?? '';
    const retryable = [
      'ProvisionedThroughputExceededException',
      'ThrottlingException',
      'InternalServerError',
      'ServiceUnavailable',
    ];
    return retryable.includes(name);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
