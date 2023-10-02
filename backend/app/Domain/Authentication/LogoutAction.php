<?php

namespace App\Domain\Authentication;

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
    Auth::guard()->logout();
    session()->flush();
  }
}
