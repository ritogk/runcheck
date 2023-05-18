<?php

namespace App\UseCase\YouTube;

use App\Model\User;
use Illuminate\Support\Facades\Hash;
// core
use App\Core\YouTube\OAuthYoutubeClient;
// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\YouTube\SaveRefreshTokenAction;
use App\UseCase\SessionStorageAction;

class FetchAccessTokenAction
{
  private OAuthYoutubeClient $client;
  private SessionStorageAction $session_action;
  private MeAction $me_action;
  private SaveRefreshTokenAction $save_token_action;
  public function __construct(OAuthYoutubeClient $client, SessionStorageAction $session_action, MeAction $me_action, SaveRefreshTokenAction $save_token_action)
  {
    $this->client = $client;
    $this->session_action = $session_action;
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
    $this->session_action->put(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN, $token);
    return $token;
  }
}
