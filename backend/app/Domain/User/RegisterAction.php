<?php

namespace App\Domain\User;

use Illuminate\Support\Facades\Hash;
use App\Domain\User\UserRepository;
use App\Domain\User\UserEntity;

class RegisterAction
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
