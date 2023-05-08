<?php

namespace App\UseCase\Comparison;

use App\Model\User;
use App\Model\Comparison;
// usecase
use App\UseCase\Authentication\MeAction;

class RegisterComparisonAction
{
  private MeAction $action;
  public function __construct(MeAction $action)
  {
    $this->action = $action;
  }

  /**
   * Undocumented function
   *
   * @param string|null $category
   * @param string|null $title
   * @param string|null $memo
   * @param integer $video1_time_st
   * @param string $video1_url
   * @param integer $video1_type
   * @param float $video2_time_st
   * @param string $video2_url
   * @param integer $video2_type
   * @return Comparison|null
   */
  public function register(?string $category, ?string $title, ?string $memo, int $video1_time_st, string $video1_url, int $video1_type, float $video2_time_st, string $video2_url, int $video2_type): ?Comparison
  {
    $user = $this->action->me();
    $comparison = new Comparison();
    $comparison->user_id = $user ? $user->id : null;
    $comparison->category = $category;
    $comparison->title = $title;
    $comparison->memo = $memo;
    $comparison->video1_time_st = $video1_time_st;
    $comparison->video1_url = $video1_url;
    $comparison->video1_type = $video1_type;
    $comparison->video2_time_st = $video2_time_st;
    $comparison->video2_url = $video2_url;
    $comparison->video2_type = $video2_type;
    $comparison->release_kbn = false;
    $comparison->save();
    return $comparison;
  }
}
