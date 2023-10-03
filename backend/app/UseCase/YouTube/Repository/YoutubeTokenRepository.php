<?php

namespace App\UseCase\YouTube\Repository;

use App\Model\YoutubeToken;

class YoutubeTokenRepository
{
  /**
   * Undocumented function
   *
   * @param integer $user_id
   * @param string $refresh_token
   * @return void
   */
  public function saveToken(int $user_id, string $refresh_token): void
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
