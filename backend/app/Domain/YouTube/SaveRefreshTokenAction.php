<?php

namespace App\Domain\YouTube;

use App\Model\YoutubeToken;

class SaveRefreshTokenAction
{
  /**
   * save
   *
   * @return User|null
   */
  public function save(int $user_id, string $refresh_token): void
  {
    $token = YoutubeToken::where('user_id', $user_id)->first();
    if (!$token) {
      $youtube_token = new YoutubeToken();
      $youtube_token->user_id = $user_id;
      $youtube_token->refresh_token = $refresh_token;
      $youtube_token->save();
    } else {
      $token->refresh_token = $refresh_token;
      $token->save();
    }
  }
}
