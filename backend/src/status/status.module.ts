import { Module } from '@nestjs/common';
import { GetStatusController } from './controllers/get-status.controller';
import { GetStatusUseCase } from './use-cases/get-status.use-case';
import { YoutubeModule } from '../youtube/youtube.module';

@Module({
  imports: [YoutubeModule],
  controllers: [GetStatusController],
  providers: [GetStatusUseCase],
})
export class StatusModule {}
