import { Global, Module } from '@nestjs/common';
import { ElectroDBService } from './electrodb.service';

@Global()
@Module({
  providers: [ElectroDBService],
  exports: [ElectroDBService],
})
export class ElectroDBModule {}
