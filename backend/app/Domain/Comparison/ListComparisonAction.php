<?php

namespace App\Domain\Comparison;

// Domain
use App\Domain\Authentication\GetMeAction;
use App\Domain\Comparison\ComparisonRepository;

class ListComparisonAction
{
  private GetMeAction $action;
  private ComparisonRepository $comparisonRepository;
  public function __construct(GetMeAction $action, ComparisonRepository $comparisonRepository)
  {
    $this->action = $action;
    $this->comparisonRepository = $comparisonRepository;
  }

  /**
   * list
   *
   * @return ComparisonEntity[]
   */
  public function list(): array
  {
    $user = $this->action->me();
    $comparisons = $this->comparisonRepository->findByUserId($user->id);
    return $comparisons;
  }
}
