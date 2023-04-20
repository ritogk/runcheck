<?php

namespace App\Services;

use App\Model\Comparison;

class ComparisonService
{
  /**
   * 削除
   *
   * @param integer $comparison_id
   * @return void
   */
  public function delete(int $comparison_id): void
  {
    $comparison = Comparison::find($comparison_id);
    // $user = $this->authentication_service->me();
    $user = null;
    if ($user->id == $comparison->user_id) {
      $comparison->delete();
    }
  }

  /**
   * 公開状態にする
   *
   * @param integer $comparison_id
   * @return void
   */
  public function publish(int $comparison_id): void
  {
    $comparison = Comparison::find($comparison_id);
    // $user = $this->authentication_service->me();
    $user = null;
    if ($user->id == $comparison->user_id || $comparison->anonymous) {
      $comparison->release_kbn = true;
    }
    $comparison->save();
  }
}
