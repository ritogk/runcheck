import { Injectable } from '@nestjs/common';
import { OperationLogRepository } from '../repositories/operation-log.repository';

@Injectable()
export class UpdateOperationLogUseCase {
  constructor(private readonly operationLogRepository: OperationLogRepository) {}

  async execute(operationCd: number): Promise<void> {
    await this.operationLogRepository.incrementCount(operationCd);
  }
}
