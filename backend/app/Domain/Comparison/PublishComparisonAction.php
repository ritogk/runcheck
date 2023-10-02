<?php

namespace App\Domain\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
use App\Domain\Comparison\ComparisonRepository;
use App\Exceptions\DataNotFoundException;
// Domain
use App\Domain\Authentication\GetMeAction;

class PublishComparisonAction
{
  private GetMeAction $action;
  private ComparisonRepository $comparisonRepository;
  public function __construct(
    GetMeAction $action,
    ComparisonRepository $comparisonRepository
  ) {
    $this->action = $action;
    $this->comparisonRepository = $comparisonRepository;
  }

  /**
   * publish
   *
   * @param integer $comparison_id
   * @return void
   */
  public function publish(int $comparison_id): void
  {
    $comparison = $this->comparisonRepository->findById($comparison_id);
    if (!$comparison) {
      throw new DataNotFoundException();
    }
    // 公開上にできるのは本人か、匿名公開の場合のみ
    $user = $this->action->me();
    if (($user && $user->id == $comparison->user_id) || $comparison->anonymous) {
      $this->comparisonRepository->publishById($comparison->id);
      return;
    }
    throw new AuthorizationException();
  }
}
