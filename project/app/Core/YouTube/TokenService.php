<?php

namespace App\Core\YouTube;

use App\Model\YoutubeToken;


class TokenService
{
  public function save_refresh_token(int $user_id, string $refresh_token): void
  {
    $youtube_token = new YoutubeToken();
    $youtube_token->user_id = $user_id;
    $youtube_token->refresh_token = $refresh_token;
    $youtube_token->save();
  }
}
