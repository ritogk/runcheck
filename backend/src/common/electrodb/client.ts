import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

const endpoint = process.env.DYNAMODB_ENDPOINT;

export const dynamoClient = new DynamoDBClient({
  ...(endpoint
    ? {
        endpoint,
        region: 'ap-northeast-1',
        credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
      }
    : { region: process.env.AWS_REGION || 'ap-northeast-1' }),
  maxAttempts: 3,
});

export const entityConfig = {
  table: TABLE_NAME,
  client: dynamoClient,
} as const;
