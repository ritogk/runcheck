<?php

namespace App\UseCase\User\Repository;

use App\Model\User;

class UserEntity implements \JsonSerializable
{
  public readonly int $id;
  public readonly string $name;

  public function __construct(User $user)
  {
    $this->id = $user->id;
    $this->name = $user->id;
  }

  public function jsonSerialize()
  {
    return [
      'id' => $this->id,
      'name' => $this->name
    ];
  }
}
