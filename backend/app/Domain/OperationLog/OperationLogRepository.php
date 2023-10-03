<?php

namespace App\Domain\OperationLog;

use App\Domain\OperationLog\OperationLogEntity;
use App\Model\OperationLog;

class OperationLogRepository
{
  /**
   * Undocumented function
   *
   * @param integer $operation_cd
   * @return OperationLogEntity|null
   */
  public function findByOperationCd(int $operation_cd): ?OperationLogEntity
  {
    $operation_log = OperationLog::where('operation_cd', $operation_cd)->first();
    if (!$operation_log) {
      return null;
    }
    return new OperationLogEntity($operation_log);
  }

  /**
   * Undocumented function
   *
   * @param integer $operation_cd
   * @return void
   */
  public function upgradeExecutionCnt(int $operation_cd): void
  {
    $operation_log = OperationLog::where('operation_cd', $operation_cd)->first();
    if (!$operation_log) {
      return;
    }
    $operation_log->execution_cnt = $operation_log->execution_cnt + 1;
    $operation_log->save();
  }
}
