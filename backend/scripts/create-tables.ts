import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';

const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';

const client = new DynamoDBClient({
  endpoint,
  region: 'ap-northeast-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
});

const tables: CreateTableCommandInput[] = [
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
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      },
      {
        IndexName: 'KindIndex',
        KeySchema: [{ AttributeName: 'kind', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      },
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
  },
];

async function createTables() {
  for (const tableInput of tables) {
    try {
      await client.send(new DescribeTableCommand({ TableName: tableInput.TableName }));
      console.log(`Table ${tableInput.TableName} already exists, skipping.`);
    } catch {
      try {
        await client.send(new CreateTableCommand(tableInput));
        console.log(`Created table: ${tableInput.TableName}`);
      } catch (err) {
        console.error(`Failed to create table ${tableInput.TableName}:`, err);
      }
    }
  }
}

createTables().then(() => console.log('Done.'));
