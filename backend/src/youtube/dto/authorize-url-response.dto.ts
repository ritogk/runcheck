import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeUrlResponseDto {
  @ApiProperty({ description: '認可画面のリダイレクト用URL' })
  redirectUrl: string;
}
