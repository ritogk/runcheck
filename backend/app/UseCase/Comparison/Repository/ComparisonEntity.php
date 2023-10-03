<?php

namespace App\UseCase\Comparison\Repository;


use App\Model\Comparison;

class ComparisonEntity implements \JsonSerializable
{
  public int $id;
  public int $user_id;
  public string $title;
  public ?string $memo;
  public string $category;
  public string $video1_url;
  public float $video1_time_st;
  public string $video2_url;
  public float $video2_time_st;
  public int $release_kbn;
  public int $video_type;
  public string $video1_type;
  public string $video2_type;
  public bool $anonymous;

  public function __construct(Comparison $comparison)
  {
    $this->id = $comparison->id;
    $this->user_id = $comparison->user_id;
    $this->title = $comparison->title;
    $this->memo = $comparison->memo;
    $this->category = $comparison->category;
    $this->video1_url = $comparison->video1_url;
    $this->video1_time_st = $comparison->video1_time_st;
    $this->video2_url = $comparison->video2_url;
    $this->video2_time_st = $comparison->video2_time_st;
    $this->release_kbn = $comparison->release_kbn;
    $this->video_type = $comparison->video_type;
    $this->video1_type = $comparison->video1_type;
    $this->video2_type = $comparison->video2_type;
    $this->anonymous = $comparison->anonymous;
  }

  public function jsonSerialize()
  {
    return [
      'id' => $this->id,
      'user_id' => $this->user_id,
      'title' => $this->title,
      'memo' => $this->memo,
      'category' => $this->category,
      'video1_url' => $this->video1_url,
      'video1_time_st' => $this->video1_time_st,
      'video2_url' => $this->video2_url,
      'video2_time_st' => $this->video2_time_st,
      'release_kbn' => $this->release_kbn,
      'video_type' => $this->video_type,
      'video1_type' => $this->video1_type,
      'video2_type' => $this->video2_type,
      'anonymous' => $this->anonymous,
    ];
  }
}
