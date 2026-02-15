import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'ハンドルネーム' })
  @IsString()
  @IsNotEmpty()
  handleName: string;

  @ApiProperty({ description: '車種' })
  @IsString()
  @IsNotEmpty()
  carType: string;

  @ApiProperty({ description: 'メールアドレス' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'パスワード' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserResponseDto {
  @ApiProperty({ description: 'ユーザーID' })
  id: string;

  @ApiProperty({ description: 'ネーム' })
  name: string;
}
