import { Injectable } from '@nestjs/common';
import { ElectroDBService } from '../../common/electrodb/electrodb.service';
import type { User } from '../../common/entities';

@Injectable()
export class UserRepository {
  constructor(private readonly electrodb: ElectroDBService) {}

  async create(user: User): Promise<void> {
    await this.electrodb.user.create(user).go();
  }

  async findById(userId: string): Promise<User | null> {
    const { data } = await this.electrodb.user.get({ id: userId }).go();
    return (data as User) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data } = await this.electrodb.user.query.byEmail({ email }).go();
    return (data[0] as User) ?? null;
  }
}
