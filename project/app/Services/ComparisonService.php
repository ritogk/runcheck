<?php

namespace App\Services;

use App\Model\Comparison;

class ComparisonService
{
  private AuthenticationService $authentication_service;
  public function __construct()
  {
    $this->authentication_service = new AuthenticationService();
  }

  /**
   * 新規作成
   *
   * @param integer $user_id
   * @param string $category
   * @param string|null $title
   * @param string|null $memo
   * @param integer $video1_time_st
   * @param string $video1_url
   * @param string $video1_type
   * @param float $video2_time_st
   * @param string $video2_url
   * @param string $video2_type
   * @return Comparison|null
   */
  public function create(?int $user_id, ?string $category, ?string $title, ?string $memo, int $video1_time_st, string $video1_url, int $video1_type, float $video2_time_st, string $video2_url, int $video2_type): ?Comparison
  {
    $comparison = new Comparison();
    $comparison->user_id = $user_id;
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
    $comparison->anonymous = $this->authentication_service->me() ? false : true;
    $comparison->save();
    return $comparison;
  }

  /**
   * 削除
   *
   * @param integer $comparison_id
   * @return void
   */
  public function delete(int $comparison_id): void
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->authentication_service->me();
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
    $user = $this->authentication_service->me();
    if ($user->id == $comparison->user_id || $comparison->anonymous) {
      $comparison->release_kbn = true;
    }
    $comparison->save();
  }

  /**
   * １件取得
   *
   * @param integer $comparison_id
   * @return Comparison|null
   */
  public function find(int $comparison_id): ?Comparison
  {
    $comparison = Comparison::find($comparison_id);
    $user = $this->authentication_service->me();
    // 匿名情報は公開されている物だけ返す
    if ($comparison->anonymous && $comparison->release_kbn) {
      return $comparison;
    }
    // 自身の情報は公開フラグ関係なしに返す。
    if ($user && $user->id == $comparison->user_id) {
      return $comparison;
    }
    return null;
  }
}
