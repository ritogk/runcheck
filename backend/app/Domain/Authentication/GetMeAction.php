<?php

namespace App\Domain\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

class GetMeAction
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
