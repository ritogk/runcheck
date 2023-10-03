<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

class GetMeAction
{
  private Auth $auth;
  public function __construct(Auth $auth)
  {
    $this->auth = $auth;
  }

  /**
   * Undocumented function
   *
   * @return User|null
   */
  public function me(): ?User
  {
    return $this->auth::guard()->user();
  }
}
