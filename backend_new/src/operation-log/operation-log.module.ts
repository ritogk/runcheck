import { Module } from '@nestjs/common';
import { OperationLogController } from './operation-log.controller';
import { UpdateOperationLogUseCase } from './use-cases/update-operation-log.use-case';
import { OperationLogRepository } from './repositories/operation-log.repository';

@Module({
  controllers: [OperationLogController],
  providers: [UpdateOperationLogUseCase, OperationLogRepository],
})
export class OperationLogModule {}
