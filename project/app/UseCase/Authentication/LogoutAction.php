<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;

class LogoutAction
{
  /**
   * Undocumented function
   *
   * @return void
   */
  public function logout(): void
  {
    session()->flush();
    Auth::guard()->logout();
  }
}
