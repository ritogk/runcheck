<?php

namespace App\Domain\Comparison;

use App\Model\Comparison;
// Domain
use App\Domain\Authentication\GetMeAction;

class ListComparisonAction
{
  private GetMeAction $action;
  public function __construct(GetMeAction $action)
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
    $comparisons = Comparison::where("user_id", $user->id)->where("video_type", Comparison::VIDEO_TYPE_KIND["YOUTUBE_YOUTUBE"])->orderBy("id")->get();
    return $comparisons->toArray();
  }
}
