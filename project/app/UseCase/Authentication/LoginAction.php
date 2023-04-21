<?php

namespace App\UseCase\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Model\User;

// usecase
use App\UseCase\SessionStorageAction;
use App\UseCase\YouTube\GenerateAccessTokenAction;

class LoginAction
{
  private SessionStorageAction $session_action;
  private GenerateAccessTokenAction $generate_access_token_action;
  public function __construct(SessionStorageAction $session_action, GenerateAccessTokenAction $generate_access_token_action)
  {
    $this->session_action = $session_action;
    $this->generate_access_token_action = $generate_access_token_action;
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
    // リフレッシュトークンからアクセストークンを生成
    try {
      $token = $this->generate_access_token_action->generate();
      if ($token) {
        $this->session_action->put(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN, $token);
      }
    } catch (\Exception $e) {
    }
    return $user;
  }
}
