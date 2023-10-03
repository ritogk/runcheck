<?php

namespace App\Core\Session;

class YoutubeTokenSessionValue
{
  public static $session_key = 'YOUTUBE_ACCESS_TOKEN';

  public readonly string $access_token;
  public readonly int $expires_in;
  public readonly string $scope;
  public readonly string $token_type;
  public readonly int $created;

  public function __construct(array $token)
  {
    $this->access_token = $token['access_token'];
    $this->expires_in = $token['expires_in'];
    $this->scope = $token['scope'];
    $this->token_type = $token['token_type'];
    $this->created = $token['created'];
  }

  public function toArray()
  {
    return [
      'access_token' => $this->access_token,
      'expires_in' => $this->expires_in,
      'scope' => $this->scope,
      'token_type' => $this->token_type,
      'created' => $this->created,
    ];
  }
}
