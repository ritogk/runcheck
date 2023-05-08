<?php

namespace App\UseCase\Comparison;

use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\MeAction;

class ListComparisonAction
{
  private MeAction $action;
  public function __construct(MeAction $action)
  {
    $this->action = $action;
  }

  /**
   * list
   *
   * @return array
   */
  public function list(): array
  {
    $user = $this->action->me();
    $comparisons = Comparison::where("user_id", $user->id)->orderBy("id")->get();
    return $comparisons->toArray();
  }
}