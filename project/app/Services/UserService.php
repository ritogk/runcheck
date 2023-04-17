<?php

namespace App\Services;

use App\Model\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
  public function create(string $handle_name, string $car_type, string $email, string $password): User
  {
    return User::create([
      'name' => $handle_name,
      'car_type' => $car_type,
      'email' => $email,
      'password' => Hash::make($password),
    ]);
  }
}
