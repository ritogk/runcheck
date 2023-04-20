<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

class AuthenticationService
{

  /**
   * ユーザー情報取得
   *
   * @return User|null
   */
  public function me(): ?User
  {
    return Auth::guard()->user();
  }
}
