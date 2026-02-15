import { Module } from '@nestjs/common';
import { ElectroDBModule } from './common/electrodb/electrodb.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ComparisonsModule } from './comparisons/comparisons.module';
import { YoutubeModule } from './youtube/youtube.module';
import { OperationLogModule } from './operation-log/operation-log.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ElectroDBModule,
    UsersModule,
    AuthenticationModule,
    ComparisonsModule,
    YoutubeModule,
    OperationLogModule,
    StatusModule,
  ],
})
export class AppModule {}
