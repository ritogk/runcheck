<?php

namespace App\UseCase\Comparison;

// UseCase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\Comparison\Repository\IComparisonRepository;

class GetComparisonsAction
{
  private GetMeAction $action;
  private IComparisonRepository $comparisonRepository;
  public function __construct(GetMeAction $action, IComparisonRepository $comparisonRepository)
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
