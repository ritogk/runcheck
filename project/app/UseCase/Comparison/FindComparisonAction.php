<?php

namespace App\UseCase\Comparison;

use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\MeAction;

class FindComparisonAction
{
  private MeAction $action;
  public function __construct(MeAction $action)
  {
    $this->action = $action;
  }

  /**
   * find
   *
   * @param integer $comparison_id
   * @return Comparison|null
   */
  public function find(int $comparison_id): ?Comparison
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->action->me();
    // 自身の情報は公開フラグ関係なしに返す。
    if ($user && $user->id == $comparison->user_id) {
      return $comparison;
    }
    // 匿名情報
    if ($comparison->release_kbn && $comparison->anonymous) {
      return $comparison;
    }
    return null;
  }
}
