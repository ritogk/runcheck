import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { GetStatusUseCase } from './use-cases/get-status.use-case';
import { YoutubeModule } from '../youtube/youtube.module';

@Module({
  imports: [YoutubeModule],
  controllers: [StatusController],
  providers: [GetStatusUseCase],
})
export class StatusModule {}
