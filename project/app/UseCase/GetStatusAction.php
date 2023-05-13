<?php

namespace App\UseCase;

// usecase
use App\UseCase\Authentication\MeAction;

class GetStatusAction
{
  private MeAction $me_action;
  public function __construct(MeAction $action)
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
    if($user !== null){
      $youtube_token = $user->youtube_token;
      $isYoutubeAuthroized = !empty($youtube_token);
    }else{
      $isYoutubeAuthroized = false;
    }
    return ['is_logined' => $isLogined, 'is_youtube_authroized' => $isYoutubeAuthroized, 'user' => $user];
  }
}
