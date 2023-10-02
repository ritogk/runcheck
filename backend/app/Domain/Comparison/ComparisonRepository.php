<?php

namespace App\Domain\Comparison;

use App\Domain\Comparison\ComparisonEntity;
use App\Model\Comparison;

class ComparisonRepository
{
  /**
   * Undocumented function
   *
   * @param integer $id
   * @return ComparisonEntity|null
   */
  public function findById(int $id): ?ComparisonEntity
  {
    $comparison = Comparison::where('id', $id)->first();
    if (!$comparison) {
      return null;
    }
    return new ComparisonEntity($comparison);
  }

  /**
   * Undocumented function
   *
   * @param integer $id
   * @return void
   */
  public function deleteById(int $id): void
  {
    Comparison::where('id', $id)->delete();
  }

  /**
   * Undocumented function
   *
   * @param integer $user_id
   * @return ComparisonEntity[]
   */
  public function findByUserId(int $user_id): array
  {
    $result = Comparison::where("user_id", $user_id)
      ->where("video_type", Comparison::VIDEO_TYPE_KIND["YOUTUBE_YOUTUBE"])
      ->orderBy("id")
      ->get();

    $comparisons = [];
    foreach ($result as $comparison) {
      $comparisons[] = new ComparisonEntity($comparison);
    }
    return $comparisons;
  }

  /**
   * Undocumented function
   *
   * @param integer $id
   * @return void
   */
  public function publishById(int $id): void
  {
    $comparison = Comparison::where("id", $id)->first();
    $comparison->release_kbn = true;
    $comparison->save();
  }

  public function create(?int $user_id, ?string $category, ?string $title, ?string $memo, float $video1_time_st, string $video1_url, int $video1_type, float $video2_time_st, string $video2_url, int $video2_type, bool $anonymous): ComparisonEntity
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
    $comparison->video_type = Comparison::VIDEO_TYPE_KIND['YOUTUBE_YOUTUBE'];
    $comparison->release_kbn = false;
    $comparison->anonymous = $anonymous;
    $comparison->save();

    return new ComparisonEntity($comparison);
  }
}
