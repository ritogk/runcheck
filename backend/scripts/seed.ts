import * as bcrypt from 'bcryptjs';
import { ulid } from 'ulid';
import { UserEntity } from '../src/common/electrodb/entities/user.entity';
import { OperationLogEntity, OperationCd } from '../src/common/electrodb/entities/operation-log.entity';

if (!process.env.DYNAMODB_ENDPOINT) {
  process.env.DYNAMODB_ENDPOINT = 'http://localhost:8000';
}

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
  for (const [name, cd] of Object.entries(OperationCd)) {
    await OperationLogEntity.create({
      id: cd,
      operationCd: cd,
      operationNm: name,
      executionCnt: 0,
      updatedAt: now,
    }).go();
  }
  console.log(`Seeded ${Object.values(OperationCd).length} operation log entries.`);
}

seed().then(() => console.log('Seed completed.'));
