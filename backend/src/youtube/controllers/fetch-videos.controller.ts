import { Controller, Get, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { YoutubeVideoDto } from '../dto/youtube-video.dto';
import { FetchVideosUseCase } from '../use-cases/fetch-videos.use-case';

@ApiTags('youtube')
@Controller('youtube')
export class FetchVideosController {
  constructor(private readonly fetchVideos: FetchVideosUseCase) {}

  @Get('videos')
  @ApiOperation({ summary: '本人がアップロードした動画一覧を取得' })
  @ApiHeader({ name: 'x-youtube-access-token', description: 'YouTubeアクセストークン' })
  @ApiResponse({ status: 200, type: [YoutubeVideoDto] })
  async handle(
    @Headers('x-youtube-access-token') accessToken: string,
  ): Promise<YoutubeVideoDto[]> {
    return this.fetchVideos.execute(accessToken);
  }
}
