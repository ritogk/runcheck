<?php

namespace App\UseCase\Comparison;

// UseCase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\Comparison\Repository\ComparisonRepository;

class RegisterComparisonAction
{
  private GetMeAction $action;
  private ComparisonRepository $comparisonRepository;
  public function __construct(GetMeAction $action, ComparisonRepository $comparisonRepository)
  {
    $this->action = $action;
    $this->comparisonRepository = $comparisonRepository;
  }

  /**
   * Undocumented function
   *
   * @param bool $anonymous
   * @param string|null $category
   * @param string|null $title
   * @param string|null $memo
   * @param integer $video1_time_st
   * @param string $video1_url
   * @param integer $video1_type
   * @param float $video2_time_st
   * @param string $video2_url
   * @param integer $video2_type
   * @return ComparisonEntity
   */
  public function register(bool $anonymous, ?string $category, ?string $title, ?string $memo, float $video1_time_st, string $video1_url, int $video1_type, float $video2_time_st, string $video2_url, int $video2_type): ComparisonEntity
  {
    $user = $this->action->me();
    $comparison = $this->comparisonRepository->create(
      $user ? $user->id : null,
      $category,
      $title,
      $memo,
      $video1_time_st,
      $video1_url,
      $video1_type,
      $video2_time_st,
      $video2_url,
      $video2_type,
      $anonymous
    );
    return $comparison;
  }
}
