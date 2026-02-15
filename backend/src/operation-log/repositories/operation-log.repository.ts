import { Injectable } from '@nestjs/common';
import { ElectroDBService } from '../../common/electrodb/electrodb.service';

@Injectable()
export class OperationLogRepository {
  constructor(private readonly electrodb: ElectroDBService) {}

  async incrementCount(operationCd: number): Promise<void> {
    await this.electrodb.operationLog
      .update({ id: String(operationCd) })
      .add({ executionCnt: 1 })
      .set({ updatedAt: new Date().toISOString() })
      .go();
  }
}
