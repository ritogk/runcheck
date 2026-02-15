import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VideoType } from '../../common/entities';

export class ComparisonResponseDto {
  @ApiProperty({ description: '比較ID' })
  id: string;

  @ApiPropertyOptional({ description: 'カテゴリ' })
  category?: string;

  @ApiPropertyOptional({ description: 'メモ' })
  memo?: string;

  @ApiPropertyOptional({ description: 'タイトル' })
  title?: string;

  @ApiProperty({ description: '動画1 URL' })
  video1Url: string;

  @ApiProperty({ description: '動画1 開始時間' })
  video1TimeSt: number;

  @ApiProperty({ description: '動画1 動画タイプ', enum: VideoType })
  video1VideoType: VideoType;

  @ApiProperty({ description: '動画2 URL' })
  video2Url: string;

  @ApiProperty({ description: '動画2 開始時間' })
  video2TimeSt: number;

  @ApiProperty({ description: '動画2 動画タイプ', enum: VideoType })
  video2VideoType: VideoType;

  @ApiProperty({ description: '匿名投稿' })
  anonymous: boolean;
}
