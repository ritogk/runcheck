<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;
use Illuminate\Auth\AuthenticationException;

class LoginAction
{
  /**
   * Undocumented function
   *
   * @param string $email
   * @param string $password
   * @param boolean $remeber
   * @return User|null
   * @throws AuthenticationException
   */
  public function login(string $email, string $password, bool $remeber): ?User
  {
    $credentials = ['email' => $email, 'password' => $password];
    if (!Auth::guard()->attempt($credentials, $remeber)) {
      throw new AuthenticationException();
    }
    $user = Auth::guard()->user();
    session()->regenerate(true);

    return $user;
  }
}
