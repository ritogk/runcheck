<?php

namespace App\UseCase\OperationLog;

use App\Exceptions\DataNotFoundException;
use App\UseCase\OperationLog\Repository\IOperationLogRepository;

class UpdateOperationLogAction
{
  private IOperationLogRepository $operationLogRepository;
  public function __construct(IOperationLogRepository $operationLogRepository)
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
