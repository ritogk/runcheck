<?php

namespace App\UseCase\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
// UseCase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\Comparison\Repository\ComparisonEntity;
use App\UseCase\Comparison\Repository\ComparisonRepository;
use App\Exceptions\DataNotFoundException;

class FindComparisonAction
{
  private GetMeAction $action;
  private ComparisonRepository $comparisonRepository;
  public function __construct(GetMeAction $action, ComparisonRepository $comparisonRepository)
  {
    $this->action = $action;
    $this->comparisonRepository = $comparisonRepository;
  }

  /**
   * find
   *
   * @param integer $comparison_id
   * @throws AuthorizationException
   * @return ComparisonEntity
   */
  public function find(int $comparison_id): ComparisonEntity
  {
    $comparison = $this->comparisonRepository->findById($comparison_id);
    if (!$comparison) {
      throw new DataNotFoundException();
    }
    if ($comparison->release_kbn) {
      // 公開済の比較データなので他のユーザーでも返す。
      return $comparison;
    }

    // 未公開の比較データは他人に見せない。
    $user = $this->action->me();
    if ($user && $user->id == $comparison->user_id) {
      return $comparison;
    }
    throw new AuthorizationException();
  }
}
