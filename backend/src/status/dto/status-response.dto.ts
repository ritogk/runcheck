import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class StatusUserDto {
  @ApiProperty({ description: 'ユーザーID' })
  id: string;

  @ApiProperty({ description: 'ネーム' })
  name: string;
}

export class StatusResponseDto {
  @ApiProperty({ description: 'ログイン済みかどうか' })
  isLogined: boolean;

  @ApiProperty({ description: 'YouTube認証済みかどうか' })
  isYoutubeAuthroized: boolean;

  @ApiPropertyOptional({ description: 'ユーザー情報', type: StatusUserDto, nullable: true })
  user: StatusUserDto | null;
}
