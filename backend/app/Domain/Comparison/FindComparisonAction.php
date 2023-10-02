<?php

namespace App\Domain\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
use App\Model\Comparison;
// Domain
use App\Domain\Authentication\GetMeAction;

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
   * @throws AuthorizationException
   * @return Comparison
   */
  public function find(int $comparison_id): ?Comparison
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->action->me();
    if ($comparison->release_kbn) {
      return $comparison;
    } else {
      if ($user && $user->id == $comparison->user_id) {
        return $comparison;
      }
    }
    throw new AuthorizationException();
  }
}
