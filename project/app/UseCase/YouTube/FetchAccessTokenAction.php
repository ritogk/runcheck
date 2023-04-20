<?php

namespace App\UseCase\YouTube;

use App\Model\User;
use Illuminate\Support\Facades\Hash;
// core
use App\Core\YouTube\OAuthYoutubeClient;
use App\Core\SessionStorage;
// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\YouTube\SaveRefreshTokenAction;

class FetchAccessTokenAction
{
  private OAuthYoutubeClient $client;
  private SessionStorage $session;
  private MeAction $me_action;
  private SaveRefreshTokenAction $save_token_action;
  public function __construct(OAuthYoutubeClient $client, SessionStorage $session, MeAction $me_action, SaveRefreshTokenAction $save_token_action)
  {
    $this->client = $client;
    $this->session = $session;
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
    $this->session->put(SessionStorage::KEY_YOUTUBE_ACCESS_TOKEN, $token);
    $user = $this->me_action->me();
    if ($user) {
      $this->save_token_action->save($user->id, $token['refresh_token']);
    }
    return $token;
  }
}
