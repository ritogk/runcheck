<?php

namespace App\UseCase\OperationLog\Repository;

use App\Model\OperationLog;

class OperationLogEntity implements \JsonSerializable
{
  public readonly int $id;
  public readonly int $operation_cd;
  public readonly string $operation_nm;
  public readonly string $execution_cnt;

  public function __construct(OperationLog $operationLog)
  {
    $this->id = $operationLog->id;
    $this->operation_cd = $operationLog->operation_cd;
    $this->operation_nm = $operationLog->operation_nm;
    $this->execution_cnt = $operationLog->execution_cnt;
  }

  public function jsonSerialize()
  {
    return [
      'id' => $this->id,
      'operation_cd' => $this->operation_cd,
      'operation_nm' => $this->operation_nm,
      'execution_cnt' => $this->execution_cnt,
    ];
  }
}
