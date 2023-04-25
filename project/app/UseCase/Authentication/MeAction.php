<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

class MeAction
{
  /**
   * Undocumented function
   *
   * @return User|null
   */
  public function me(): ?User
  {
    return Auth::guard()->user();
  }
}