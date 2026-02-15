import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'メールアドレス' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'パスワード' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'ログイン状態を保持' })
  @IsBoolean()
  remember: boolean;
}
