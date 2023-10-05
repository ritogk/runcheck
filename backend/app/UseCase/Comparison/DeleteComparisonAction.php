<?php

namespace App\UseCase\Comparison;

use \Illuminate\Auth\Access\AuthorizationException;
use App\Exceptions\DataNotFoundException;
// UseCase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\Comparison\Repository\IComparisonRepository;

class DeleteComparisonAction
{
  private GetMeAction $action;
  private IComparisonRepository $comparisonRepository;
  public function __construct(
    GetMeAction $action,
    IComparisonRepository $comparisonRepository
  ) {
    $this->action = $action;
    $this->comparisonRepository = $comparisonRepository;
  }

  /**
   * Undocumented function
   *
   * @param integer $comparison_id
   * @throws AuthorizationException
   * @return void
   */
  public function delete(int $comparison_id): void
  {
    $comparison = $this->comparisonRepository->findById($comparison_id);
    if (!$comparison) {
      throw new DataNotFoundException();
    }
    $user = $this->action->me();
    if ($user && $user->id == $comparison->user_id) {
      // 本人のみ削除可能
      $this->comparisonRepository->deleteById($comparison->id);
      return;
    }
    throw new AuthorizationException();
  }
}
