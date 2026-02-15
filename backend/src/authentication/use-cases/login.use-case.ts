import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../users/repositories/user.repository';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('メールアドレスまたはパスワードが正しくありません');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('メールアドレスまたはパスワードが正しくありません');
    }

    const payload = { sub: user.id, name: user.name };
    const expiresIn = dto.remember ? '7d' : '24h';
    const accessToken = this.jwtService.sign(payload, { expiresIn });

    return {
      id: user.id,
      name: user.name,
      accessToken,
    };
  }
}
