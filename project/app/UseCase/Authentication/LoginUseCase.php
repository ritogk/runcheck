<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

class LoginUseCase
{
  /**
   * Undocumented function
   *
   * @param string $email
   * @param string $password
   * @param boolean $remeber
   * @return User|null
   */
  public function __invoke(string $email, string $password, bool $remeber): ?User
  {
    $credentials = ['email' => $email, 'password' => $password];
    if (Auth::guard()->attempt($credentials, $remeber)) {
      $user = Auth::guard()->user();
      session()->regenerate(true);
      return $user;
    }
    return null;
  }
}
