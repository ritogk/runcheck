<?php

namespace App\Services;

use App\Model\OperationLog;

class OperationLogService
{
  /**
   * 操作ログ更新
   *
   * @param integer $operation_cd
   * @return void
   */
  public function update_log(int $operation_cd): void
  {
    $operation_log = OperationLog::where('operation_cd', $operation_cd)->first();
    $operation_log->execution_cnt = $operation_log->execution_cnt + 1;
    $operation_log->save();
    return;
  }
}
