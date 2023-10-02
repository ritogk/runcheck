<?php

namespace App\Domain\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
use App\Model\Comparison;
// Domain
use App\Domain\Authentication\GetMeAction;

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
   * @throws AuthorizationException
   * @return void
   */
  public function delete(int $comparison_id): void
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->action->me();
    if ($user && $user->id == $comparison->user_id) {
      // 本人のみ削除可能
      $comparison->delete();
      return;
    }
    throw new AuthorizationException();
  }
}
