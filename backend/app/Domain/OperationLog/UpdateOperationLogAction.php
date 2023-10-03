<?php

namespace App\Domain\OperationLog;

use App\Exceptions\DataNotFoundException;
use App\Domain\OperationLog\OperationLogRepository;

class UpdateOperationLogAction
{
  private OperationLogRepository $operationLogRepository;
  public function __construct(OperationLogRepository $operationLogRepository)
  {
    $this->operationLogRepository = $operationLogRepository;
  }
  /**
   * update
   *
   * @return User|null
   */
  public function update(int $operation_cd): void
  {
    $operation_log = $this->operationLogRepository->findByOperationCd($operation_cd);
    if (!$operation_log) {
      throw new DataNotFoundException();
    }
    $this->operationLogRepository->upgradeExecutionCnt($operation_cd);
  }
}
