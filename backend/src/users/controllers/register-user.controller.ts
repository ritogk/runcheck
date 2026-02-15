import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { RegisterUserUseCase } from '../use-cases/register-user.use-case';

@ApiTags('users')
@Controller('users')
export class RegisterUserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '新規登録', operationId: 'registerUser' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async handle(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.registerUser.execute(dto);
  }
}
