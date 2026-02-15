<?php

namespace App\UseCase\User\Repository;

use App\Model\User;
use App\UseCase\User\Repository\UserEntity;

interface IUserRepository
{
  public function create(
    string $handle_name,
    string $car_type,
    string $email,
    string $password
  ): UserEntity;
}

class UserRepository implements IUserRepository
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
