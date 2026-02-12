import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { GetAuthorizeUrlUseCase } from './use-cases/get-authorize-url.use-case';
import { ExchangeTokenUseCase } from './use-cases/exchange-token.use-case';
import { FetchVideosUseCase } from './use-cases/fetch-videos.use-case';
import { YoutubeTokenRepository } from './repositories/youtube-token.repository';

@Module({
  controllers: [YoutubeController],
  providers: [
    GetAuthorizeUrlUseCase,
    ExchangeTokenUseCase,
    FetchVideosUseCase,
    YoutubeTokenRepository,
  ],
  exports: [YoutubeTokenRepository],
})
export class YoutubeModule {}
