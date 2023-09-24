<?php

namespace App\UseCase\YouTube;

// core
use App\Core\YouTube\OAuthYoutubeClient;
use App\Core\SessionKey;
// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\YouTube\SaveRefreshTokenAction;

class FetchAccessTokenAction
{
  private OAuthYoutubeClient $client;
  private MeAction $me_action;
  private SaveRefreshTokenAction $save_token_action;
  public function __construct(OAuthYoutubeClient $client, MeAction $me_action, SaveRefreshTokenAction $save_token_action)
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
    // リフレッシュトークンは消してセッションに保存する
    unset($token['refresh_token']);
    session()->put(SessionKey::$YOUTUBE_ACCESS_TOKEN, $token);
    return $token;
  }
}
