<?php

namespace App\UseCase;

// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\SessionStorageAction;

class GetStatusAction
{
  private MeAction $me_action;
  private SessionStorageAction $session_storage_action;
  public function __construct(MeAction $action, SessionStorageAction $session_storage_action)
  {
    $this->me_action = $action;
    $this->session_storage_action = $session_storage_action;
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
    if($isLogined){
      $access_token = !empty($user->youtube_token);
    }else{
      $access_token = $this->session_storage_action->get(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN);
    }
    $access_token = $this->session_storage_action->get(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN);
    $isYoutubeAuthroized = !empty($access_token);
    return ['is_logined' => $isLogined, 'is_youtube_authroized' => $isYoutubeAuthroized, 'user' => $user];
  }
}
