<?php

namespace App\UseCase;

// core
use App\Core\Session\YoutubeTokenSessionValue;
// UseCase
use App\UseCase\Authentication\GetMeAction;

class GetClientStatusAction
{
  private GetMeAction $me_action;
  public function __construct(GetMeAction $action)
  {
    $this->me_action = $action;
  }

  public function get_status(): array
  {
    $user = $this->me_action->me();
    if ($user != null) {
      return $this->get_user_status();
    } else {
      return $this->get_anonymous_status();
    }
  }

  /**
   * ユーザーのステータスを取得
   *
   * @return array
   */
  private function get_user_status(): array
  {
    $user = $this->me_action->me();
    $isYoutubeAuthroized = !empty($user->youtube_token);
    return ['is_logined' => true, 'is_youtube_authroized' => $isYoutubeAuthroized, 'user' => $user];
  }

  /**
   * 匿名ユーザーのステータスを取得
   *
   * @return array
   */
  private function get_anonymous_status(): array
  {
    $accessToken = session()->get(YoutubeTokenSessionValue::$session_key);
    $isYoutubeAuthroized = !empty($accessToken);
    return ['is_logined' => false, 'is_youtube_authroized' => $isYoutubeAuthroized, 'user' => null];
  }
}
