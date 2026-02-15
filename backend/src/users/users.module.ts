import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [RegisterUserUseCase, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
