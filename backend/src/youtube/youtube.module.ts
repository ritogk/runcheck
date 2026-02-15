import { Module } from '@nestjs/common';
import { GetAuthorizeUrlController } from './controllers/get-authorize-url.controller';
import { ExchangeTokenController } from './controllers/exchange-token.controller';
import { FetchVideosController } from './controllers/fetch-videos.controller';
import { GetAuthorizeUrlUseCase } from './use-cases/get-authorize-url.use-case';
import { ExchangeTokenUseCase } from './use-cases/exchange-token.use-case';
import { FetchVideosUseCase } from './use-cases/fetch-videos.use-case';
import { YoutubeTokenRepository } from './repositories/youtube-token.repository';

@Module({
  controllers: [
    GetAuthorizeUrlController,
    ExchangeTokenController,
    FetchVideosController,
  ],
  providers: [
    GetAuthorizeUrlUseCase,
    ExchangeTokenUseCase,
    FetchVideosUseCase,
    YoutubeTokenRepository,
  ],
  exports: [YoutubeTokenRepository],
})
export class YoutubeModule {}
