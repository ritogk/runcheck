<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;
// core
use App\Core\YouTube\OAuthYoutubeClient;

// usecase
use App\UseCase\SessionStorageAction;

class LoginAction
{
  private SessionStorageAction $session_action;
  private OAuthYoutubeClient $client;
  public function __construct(SessionStorageAction $session_action, OAuthYoutubeClient $client)
  {
    $this->session_action = $session_action;
    $this->client = $client;
  }

  /**
   * Undocumented function
   *
   * @param string $email
   * @param string $password
   * @param boolean $remeber
   * @return User|null
   */
  public function login(string $email, string $password, bool $remeber): ?User
  {
    $credentials = ['email' => $email, 'password' => $password];
    if (!Auth::guard()->attempt($credentials, $remeber)) return null;

    $user = Auth::guard()->user();
    session()->regenerate(true);
    $youtube_token = $user->youtube_token;
    if ($youtube_token) {
      // リフレッシュトークンからアクセストークンを生成
      $token = $this->client->generate_token($youtube_token->refresh_token);
      unset($token['refresh_token']);
      $this->session_action->put(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN, $token);
    }
    return $user;
  }
}
