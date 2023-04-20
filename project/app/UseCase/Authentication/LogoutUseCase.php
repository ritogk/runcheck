<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;

class LogoutUseCase
{
  /**
   * Undocumented function
   *
   * @return void
   */
  public function logout(): void
  {
    Auth::guard()->logout();
  }
}
