<?php

namespace App\UseCase\User;

use Illuminate\Support\Facades\Hash;
use App\UseCase\User\Repository\IUserRepository;
use App\UseCase\User\Repository\UserEntity;

class RegisterUserAction
{
  private IUserRepository $userRepository;
  public function __construct(IUserRepository $userRepository)
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
