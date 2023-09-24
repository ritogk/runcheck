<?php

namespace App\UseCase\YouTube;

// core
use App\Core\YouTube\OAuthYoutubeClient;
// usecase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\YouTube\SaveRefreshTokenAction;

class FetchAccessTokenAction
{
  private OAuthYoutubeClient $client;
  private GetMeAction $me_action;
  private SaveRefreshTokenAction $save_token_action;
  public function __construct(OAuthYoutubeClient $client, GetMeAction $me_action, SaveRefreshTokenAction $save_token_action)
  {
    $this->client = $client;
    $this->me_action = $me_action;
    $this->save_token_action = $save_token_action;
  }

  /**
   * fetch
   *
   * @param string $code
   * @return array
   */
  public function fetch(string $code): array
  {
    $token = $this->client->fetch_token($code);
    $user = $this->me_action->me();
    if ($user) {
      $this->save_token_action->save($user->id, $token['refresh_token']);
    }
    return $token;
  }
}
