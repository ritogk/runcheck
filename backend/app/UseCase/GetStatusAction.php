<?php

namespace App\UseCase;

// core
use App\Core\SessionKey;
// usecase
use App\UseCase\Authentication\GetMeAction;

class GetStatusAction
{
  private GetMeAction $me_action;
  public function __construct(GetMeAction $action)
  {
    $this->me_action = $action;
  }

  /**
   * status
   *
   * @return array
   */
  public function status(): array
  {
    $user = $this->me_action->me();
    $isLogined = $user !== null;
    $access_token = false;
    if ($isLogined) {
      $isYoutubeAuthroized = !empty($user->youtube_token);
    } else {
      session()->get(SessionKey::$YOUTUBE_ACCESS_TOKEN);
      $isYoutubeAuthroized = !empty($access_token);
    }
    return ['is_logined' => $isLogined, 'is_youtube_authroized' => $isYoutubeAuthroized, 'user' => $user];
  }
}
