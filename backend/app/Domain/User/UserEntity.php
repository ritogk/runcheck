<?php

namespace App\Domain\User;

use App\Model\User;

class UserEntity implements \JsonSerializable
{
  private int $id;
  private string $name;
  public function __construct(User $user)
  {
    $this->id = $user->id;
    $this->name = $user->id;
  }

  public function getId(): int
  {
    return $this->id;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function jsonSerialize()
  {
    return [
      'id' => $this->id,
      'name' => $this->name
    ];
  }
}
