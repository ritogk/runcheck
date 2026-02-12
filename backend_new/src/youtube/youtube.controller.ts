import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';
import {
  YoutubeOauthDto,
  AuthorizeUrlResponseDto,
  ExchangeTokenResponseDto,
  YoutubeVideoDto,
} from './dto/youtube-oauth.dto';
import { GetAuthorizeUrlUseCase } from './use-cases/get-authorize-url.use-case';
import { ExchangeTokenUseCase } from './use-cases/exchange-token.use-case';
import { FetchVideosUseCase } from './use-cases/fetch-videos.use-case';

@ApiTags('youtube')
@Controller('youtube')
export class YoutubeController {
  constructor(
    private readonly getAuthorizeUrl: GetAuthorizeUrlUseCase,
    private readonly exchangeToken: ExchangeTokenUseCase,
    private readonly fetchVideos: FetchVideosUseCase,
  ) {}

  @Get('oauth/authorize')
  @ApiOperation({ summary: '認可画面のURLを取得' })
  @ApiResponse({ status: 200, type: AuthorizeUrlResponseDto })
  authorizeUrl(): AuthorizeUrlResponseDto {
    return this.getAuthorizeUrl.execute();
  }

  @Post('oauth')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'アクセストークンを取得' })
  @ApiResponse({ status: 200, type: ExchangeTokenResponseDto })
  async accessToken(
    @Body() dto: YoutubeOauthDto,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<ExchangeTokenResponseDto> {
    return this.exchangeToken.execute(dto.code, user);
  }

  @Get('videos')
  @ApiOperation({ summary: '本人がアップロードした動画一覧を取得' })
  @ApiHeader({ name: 'x-youtube-access-token', description: 'YouTubeアクセストークン' })
  @ApiResponse({ status: 200, type: [YoutubeVideoDto] })
  async videos(
    @Headers('x-youtube-access-token') accessToken: string,
  ): Promise<YoutubeVideoDto[]> {
    return this.fetchVideos.execute(accessToken);
  }
}
