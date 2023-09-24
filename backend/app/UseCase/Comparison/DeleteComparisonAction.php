<?php

namespace App\UseCase\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\GetMeAction;

class DeleteComparisonAction
{
  private GetMeAction $action;
  public function __construct(GetMeAction $action)
  {
    $this->action = $action;
  }

  /**
   * Undocumented function
   *
   * @param integer $comparison_id
   * @return void
   */
  public function delete(int $comparison_id): void
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->action->me();
    if ($user && $user->id == $comparison->user_id) {
      $comparison->delete();
      return;
    }
    // 他人の比較情報を削除した
    throw new AuthorizationException();
  }
}
