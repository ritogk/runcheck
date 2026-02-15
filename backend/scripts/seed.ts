import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as bcrypt from 'bcryptjs';
import { ulid } from 'ulid';

const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';

const client = new DynamoDBClient({
  endpoint,
  region: 'ap-northeast-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
});

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

const OPERATION_NAMES: Record<number, string> = {
  1: 'OPEN_MODAL_CLICK',
  2: 'OPEN_CLICK',
  3: 'SAVE_MODAL_CLICK',
  4: 'SAVE_CLICK',
  5: 'SYNC_RUN_CLICK',
  6: 'SYNC_STOP_CLICK',
  7: 'SYNC_SHARE_CLICK',
  8: 'PLAYER_ONE_URL_ENTER',
  9: 'PLAYER_ONE_YOUTUBE_SEARCH_CLICK',
  10: 'PLAYER_ONE_LOCAL_SELECT',
  11: 'PLAYER_TWO_URL_ENTER',
  12: 'PLAYER_TWO_YOUTUBE_SEARCH_CLICK',
  13: 'PLAYER_TWO_LOCAL_SELECT',
  14: 'YOUTUBE_OAUTH_CLICK',
  15: 'YOUTUBE_SELECT',
  16: 'NAV_HOME_CLICK',
  17: 'NAV_LOGIN_CLICK',
  18: 'NAV_LOGOUT_CLICK',
  19: 'NAV_REGISTER_CLICK',
  20: 'NAV_ABOUT_APP_CLICK',
  21: 'NAV_INQUIRY',
  22: 'HOME_OPEN_CLICK',
  23: 'HOME_DELETE_CLICK',
  24: 'REGISTER_CLICK',
  25: 'LOGIN_CLICK',
  26: 'SYNC_CONTROLLER_SWITCH_PLAY_CLICK',
  27: 'SYNC_CONTROLLER_SWITCH_REPEAT_CLICK',
  28: 'SYNC_CONTROLLER_SPEED_CLICK',
  29: 'SYNC_CONTROLLER_RELOAD_CLICK',
  30: 'SYNC_CONTROLLER_SWITCH_MUTE_CLICK',
};

async function seed() {
  const now = new Date().toISOString();

  // Seed a test user
  const userId = ulid();
  const password = await bcrypt.hash('password123', 10);
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        userId,
        kind: `USER@${userId}`,
        id: userId,
        email: 'test@example.com',
        name: 'テストユーザー',
        password,
        carType: 'GR86',
        createdAt: now,
        updatedAt: now,
      },
    }),
  );
  console.log(`Created test user: test@example.com / password123 (userId: ${userId})`);

  // Seed operation logs
  for (const [cd, nm] of Object.entries(OPERATION_NAMES)) {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          userId: '',
          kind: `OPERATION_LOG@${cd}`,
          operationCd: Number(cd),
          operationNm: nm,
          executionCnt: 0,
          updatedAt: now,
        },
      }),
    );
  }
  console.log('Seeded 30 operation log entries.');
}

seed().then(() => console.log('Seed completed.'));
