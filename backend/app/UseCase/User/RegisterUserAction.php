<?php

namespace App\UseCase\User;

use Illuminate\Support\Facades\Hash;
use App\UseCase\User\Repository\UserRepository;
use App\UseCase\User\Repository\UserEntity;

class RegisterUserAction
{
  private UserRepository $userRepository;
  public function __construct(UserRepository $userRepository)
  {
    $this->userRepository = $userRepository;
  }

  /**
   * ユーザーの新規登録
   *
   * @return UserEntity
   */
  public function register(
    string $handle_name,
    string $car_type,
    string $email,
    string $password
  ): UserEntity {
    return $this->userRepository->create(
      $handle_name,
      $car_type,
      $email,
      Hash::make($password)
    );
  }
}
