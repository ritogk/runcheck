<?php

namespace App\Domain\YouTube;

// core
use App\Core\Session\YoutubeTokenSessionValue;
use App\Core\YouTube\TokenValue;


class SetSessionAccessTokenAction
{
  /**
   * fetch
   *
   * @param TokenValue $youtube_token
   * @return void
   */
  public function set(TokenValue $youtube_token): void
  {
    // リフレッシュトークンは危険なのでセッションに保存しない
    $token = new YoutubeTokenSessionValue($youtube_token->toArray());
    session()->put(YoutubeTokenSessionValue::$session_key, $token->toArray());
  }
}
