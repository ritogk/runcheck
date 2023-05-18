<?php

namespace App\UseCase\Comparison;

use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\MeAction;

class DeleteComparisonAction
{
  private MeAction $action;
  public function __construct(MeAction $action)
  {
    $this->action = $action;
  }

  /**
   * delete
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
    }
  }
}
