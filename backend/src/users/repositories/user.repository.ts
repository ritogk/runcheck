import { Injectable } from '@nestjs/common';
import {
  UserEntity,
  type UserAttributes,
} from '../../common/electrodb/entities/user.entity';

@Injectable()
export class UserRepository {
  async create(user: UserAttributes): Promise<void> {
    await UserEntity.create(user).go();
  }

  async findById(userId: string): Promise<UserAttributes | null> {
    const { data } = await UserEntity.get({ id: userId }).go();
    return data ?? null;
  }

  async findByEmail(email: string): Promise<UserAttributes | null> {
    const { data } = await UserEntity.query.byEmail({ email }).go();
    return data[0] ?? null;
  }
}
