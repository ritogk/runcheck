<?php

namespace App\UseCase\YouTube;

// core
use App\Core\SessionKey;

class SetSessionAccessTokenAction
{
  /**
   * fetch
   *
   * @param array $token
   * @return array
   */
  public function set(array $token): array
  {
    // リフレッシュトークンは危険なのでセッションに保存しない
    unset($token['refresh_token']);
    session()->put(SessionKey::$YOUTUBE_ACCESS_TOKEN, $token);
    return $token;
  }
}
