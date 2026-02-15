import { Module } from '@nestjs/common';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [RegisterUserController],
  providers: [RegisterUserUseCase, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
