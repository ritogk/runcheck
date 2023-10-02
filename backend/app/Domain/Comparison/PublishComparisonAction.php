<?php

namespace App\Domain\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
use App\Model\Comparison;
// Domain
use App\Domain\Authentication\GetMeAction;

class PublishComparisonAction
{
  private GetMeAction $action;
  public function __construct(GetMeAction $action)
  {
    $this->action = $action;
  }

  /**
   * publish
   *
   * @param integer $comparison_id
   * @return void
   */
  public function publish(int $comparison_id): void
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->action->me();
    if (($user && $user->id == $comparison->user_id) || $comparison->anonymous) {
      $comparison->release_kbn = true;
      $comparison->save();
      return;
    }
    throw new AuthorizationException();
  }
}
