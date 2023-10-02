<?php

namespace App\Domain\User;

use App\Model\User;
use App\Domain\User\UserEntity;

class UserRepository
{
  public function create(
    string $handle_name,
    string $car_type,
    string $email,
    string $password
  ): UserEntity {
    $user = User::create([
      'name' => $handle_name,
      'car_type' => $car_type,
      'email' => $email,
      'password' => $password,
    ]);

    return new UserEntity($user);
  }
}
