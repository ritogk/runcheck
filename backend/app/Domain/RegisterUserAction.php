<?php

namespace App\Domain;

use App\Model\User;
use Illuminate\Support\Facades\Hash;

class RegisterUserAction
{
  /**
   * ユーザーの新規登録
   *
   * @return User|null
   */
  public function register(string $handle_name, string $car_type, string $email, string $password): User
  {
    return User::create([
      'name' => $handle_name,
      'car_type' => $car_type,
      'email' => $email,
      'password' => Hash::make($password),
    ]);
  }
}
