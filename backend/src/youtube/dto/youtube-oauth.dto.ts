import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class YoutubeOauthDto {
  @ApiProperty({ description: 'OAuth認可コード' })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class AuthorizeUrlResponseDto {
  @ApiProperty({ description: '認可画面のリダイレクト用URL' })
  redirectUrl: string;
}

export class ExchangeTokenResponseDto {
  @ApiProperty({ description: 'YouTubeアクセストークン' })
  accessToken: string;
}

export class YoutubeVideoDto {
  @ApiProperty({ description: 'URL' })
  url: string;

  @ApiProperty({ description: 'タイトル' })
  title: string;

  @ApiProperty({ description: '説明' })
  description: string;

  @ApiProperty({ description: 'サムネ画像のURL' })
  thumbnailUrl: string;
}
