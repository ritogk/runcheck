import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { VideoType } from '../../common/electrodb/entities/comparison.entity';

export class CreateComparisonDto {
  @ApiPropertyOptional({ description: 'カテゴリ' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'メモ' })
  @IsString()
  @IsOptional()
  memo?: string;

  @ApiPropertyOptional({ description: 'タイトル' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '動画1 URL' })
  @IsString()
  @IsNotEmpty()
  video1Url: string;

  @ApiProperty({ description: '動画1 開始時間' })
  @IsNumber()
  video1TimeSt: number;

  @ApiProperty({ description: '動画1 動画タイプ', enum: VideoType })
  @IsEnum(VideoType)
  video1VideoType: VideoType;

  @ApiProperty({ description: '動画2 URL' })
  @IsString()
  @IsNotEmpty()
  video2Url: string;

  @ApiProperty({ description: '動画2 開始時間' })
  @IsNumber()
  video2TimeSt: number;

  @ApiProperty({ description: '動画2 動画タイプ', enum: VideoType })
  @IsEnum(VideoType)
  video2VideoType: VideoType;

  @ApiProperty({ description: '匿名投稿' })
  @IsBoolean()
  anonymous: boolean;
}
