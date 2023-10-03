<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;

class LogoutAction
{
  private Auth $auth;
  public function __construct(Auth $auth)
  {
    $this->auth = $auth;
  }

  /**
   * Undocumented function
   *
   * @return void
   */
  public function logout(): void
  {
    $this->auth::guard()->logout();
    session()->flush();
  }
}
