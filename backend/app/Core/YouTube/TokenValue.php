<?php

namespace App\Core\YouTube;

class TokenValue
{
  public string $access_token;
  public int $expires_in;
  public string $refresh_token;
  public string $scope;
  public string $token_type;
  public int $created;
  public function __construct(array $token)
  {
    $this->access_token = $token['access_token'];
    $this->expires_in = $token['expires_in'];
    $this->refresh_token = $token['refresh_token'];
    $this->scope = $token['scope'];
    $this->token_type = $token['token_type'];
    $this->created = $token['created'];
  }

  public function toArray(): array
  {
    return [
      'access_token' => $this->access_token,
      'expires_in' => $this->expires_in,
      'refresh_token' => $this->refresh_token,
      'scope' => $this->scope,
      'token_type' => $this->token_type,
      'created' => $this->created,
    ];
  }
}
