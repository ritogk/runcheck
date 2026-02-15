import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ulid } from 'ulid';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('このメールアドレスは既に登録されています');
    }

    const now = new Date().toISOString();
    const userId = ulid();
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.userRepository.create({
      id: userId,
      email: dto.email,
      name: dto.handleName,
      password: hashedPassword,
      carType: dto.carType,
      createdAt: now,
      updatedAt: now,
    });

    return { id: userId, name: dto.handleName };
  }
}
