import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './controllers/login.controller';
import { LogoutController } from './controllers/logout.controller';
import { GetMeController } from './controllers/get-me.controller';
import { LoginUseCase } from './use-cases/login.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'local-dev-secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LoginController, LogoutController, GetMeController],
  providers: [LoginUseCase, LogoutUseCase, GetMeUseCase, JwtStrategy],
})
export class AuthenticationModule {}
