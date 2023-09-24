<?php

namespace App\UseCase\Comparison;

use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\GetMeAction;

class FindComparisonAction
{
  private GetMeAction $action;
  public function __construct(GetMeAction $action)
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
    // 非公開情報は本人のみ閲覧可能
    if ($user && $user->id == $comparison->user_id) {
      return $comparison;
    }
    // 公開情報の場合は本人に関わらず返す
    if ($comparison->release_kbn && $comparison->anonymous) {
      return $comparison;
    }
    return null;
  }
}
