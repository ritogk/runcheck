import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'ユーザーID' })
  id: string;

  @ApiProperty({ description: 'ネーム' })
  name: string;

  @ApiProperty({ description: 'アクセストークン' })
  accessToken: string;
}
