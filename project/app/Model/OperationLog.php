<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Model\OperationLog
 *
 * @property int $id
 * @property int $operation_cd 操作コード
 * @property string $operation_nm 操作名
 * @property int $execution_cnt 実行回数
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog whereExecutionCnt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog whereOperationCd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog whereOperationNm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\OperationLog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OperationLog extends Model
{
  use SoftDeletes;
}
