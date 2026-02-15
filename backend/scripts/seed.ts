import { Entity } from 'electrodb';
import * as bcrypt from 'bcryptjs';
import { ulid } from 'ulid';
import { createDynamoDBClient, TABLE_NAME } from '../src/common/electrodb/client';
import { UserSchema } from '../src/common/electrodb/entities/user.entity';
import { OperationLogSchema } from '../src/common/electrodb/entities/operation-log.entity';
import { OperationCd } from '../src/common/entities';

const client = createDynamoDBClient();
if (!process.env.DYNAMODB_ENDPOINT) {
  process.env.DYNAMODB_ENDPOINT = 'http://localhost:8000';
}

const config = { table: TABLE_NAME, client } as const;
const UserEntity = new Entity(UserSchema, config);
const OperationLogEntity = new Entity(OperationLogSchema, config);

async function seed() {
  const now = new Date().toISOString();

  // Seed a test user
  const userId = ulid();
  const password = await bcrypt.hash('password123', 10);
  await UserEntity.create({
    id: userId,
    email: 'test@example.com',
    name: 'テストユーザー',
    password,
    carType: 'GR86',
    createdAt: now,
    updatedAt: now,
  }).go();
  console.log(`Created test user: test@example.com / password123 (userId: ${userId})`);

  // Seed operation logs
  for (const value of Object.values(OperationCd).filter(v => typeof v === 'number')) {
    const cd = value as OperationCd;
    await OperationLogEntity.create({
      id: String(cd),
      operationCd: cd,
      operationNm: OperationCd[cd],
      executionCnt: 0,
      updatedAt: now,
    }).go();
  }
  console.log(`Seeded ${Object.keys(OperationCd).length / 2} operation log entries.`);
}

seed().then(() => console.log('Seed completed.'));
