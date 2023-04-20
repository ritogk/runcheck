<?php

namespace App\UseCase\Comparison;

use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\MeUseCase;

class FindComparisonUseCase
{
  private MeUseCase $action;
  public function __construct(MeUseCase $action)
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
    // 匿名情報は公開されている物だけ返す
    if ($comparison->anonymous && $comparison->release_kbn) {
      return $comparison;
    }
    // 自身の情報は公開フラグ関係なしに返す。
    if ($user && $user->id == $comparison->user_id) {
      return $comparison;
    }
    return null;
  }
}
