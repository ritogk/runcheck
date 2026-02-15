import { ApiProperty } from '@nestjs/swagger';

export class ExchangeTokenResponseDto {
  @ApiProperty({ description: 'YouTubeアクセストークン' })
  accessToken: string;
}
