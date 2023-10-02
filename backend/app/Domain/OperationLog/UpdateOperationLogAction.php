<?php

namespace App\Domain\OperationLog;

use App\Model\OperationLog;

class UpdateOperationLogAction
{
  /**
   * update
   *
   * @return User|null
   */
  public function update(int $operation_cd): void
  {
    $operation_log = OperationLog::where('operation_cd', $operation_cd)->first();
    $operation_log->execution_cnt = $operation_log->execution_cnt + 1;
    $operation_log->save();
  }
}
