import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class YoutubeOauthDto {
  @ApiProperty({ description: 'OAuth認可コード' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
