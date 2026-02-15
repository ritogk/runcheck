import { Module } from '@nestjs/common';
import { UpdateOperationLogController } from './controllers/update-operation-log.controller';
import { UpdateOperationLogUseCase } from './use-cases/update-operation-log.use-case';
import { OperationLogRepository } from './repositories/operation-log.repository';

@Module({
  controllers: [UpdateOperationLogController],
  providers: [UpdateOperationLogUseCase, OperationLogRepository],
})
export class OperationLogModule {}
