import { ApiProperty } from '@nestjs/swagger';

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
