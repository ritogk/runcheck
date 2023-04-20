<?php

namespace App\UseCase\Comparison;

use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\MeUseCase;

class DeleteComparisonUseCase
{
  private MeUseCase $action;
  public function __construct(MeUseCase $action)
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
