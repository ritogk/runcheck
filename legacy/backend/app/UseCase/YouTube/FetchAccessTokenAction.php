<?php

namespace App\UseCase\YouTube;

use App\Core\YouTube\OAuthYoutubeClientInterface;
use App\Core\YouTube\TokenValue;
// UseCase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\YouTube\SaveRefreshTokenAction;

class FetchAccessTokenAction
{
  private OAuthYoutubeClientInterface $client;
  private GetMeAction $me_action;
  private SaveRefreshTokenAction $save_token_action;
  public function __construct(OAuthYoutubeClientInterface $client, GetMeAction $me_action, SaveRefreshTokenAction $save_token_action)
  {
    $this->client = $client;
    $this->me_action = $me_action;
    $this->save_token_action = $save_token_action;
  }

  /**
   * fetch
   *
   * @param string $code
   * @return TokenValue
   */
  public function fetch(string $code): TokenValue
  {
    $token = $this->client->fetch_token($code);
    $user = $this->me_action->me();
    if ($user) {
      $this->save_token_action->save($user->id, $token->refresh_token);
    }
    return $token;
  }
}
