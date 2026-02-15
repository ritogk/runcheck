import { Injectable } from '@nestjs/common';
import { OperationLogEntity } from '../../common/electrodb/entities/operation-log.entity';

@Injectable()
export class OperationLogRepository {
  async incrementCount(operationCd: string): Promise<void> {
    await OperationLogEntity
      .update({ id: operationCd })
      .add({ executionCnt: 1 })
      .set({ updatedAt: new Date().toISOString() })
      .go();
  }
}
