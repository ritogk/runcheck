import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

export function createDynamoDBClient(): DynamoDBClient {
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  return new DynamoDBClient({
    ...(endpoint
      ? {
          endpoint,
          region: 'ap-northeast-1',
          credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
        }
      : { region: process.env.AWS_REGION || 'ap-northeast-1' }),
    maxAttempts: 3,
  });
}
