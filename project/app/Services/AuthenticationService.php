<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

class AuthenticationService
{

  /**
   * ログイン
   *
   * @param string $email
   * @param string $password
   * @param boolean $remeber
   * @return User|null
   */
  public function login(string $email, string $password, bool $remeber): ?User
  {
    $credentials = ['email' => $email, 'password' => $password];
    if (Auth::guard()->attempt($credentials, $remeber)) {
      $user = Auth::guard()->user();
      session()->regenerate(true);
      return $user;
    }
    return null;
  }

  /**
   * ログアウト
   *
   * @return void
   */
  public function logout(): void
  {
    Auth::guard()->logout();
  }

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
