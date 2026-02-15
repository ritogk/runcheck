<?php

namespace App\UseCase\YouTube;

use App\Exceptions\OAuthException;
// core
use App\Core\YouTube\OAuthYoutubeClientInterface;
use App\Core\YouTube\TokenValue;
use App\Core\Session\YoutubeTokenSessionValue;
// UseCase
use App\UseCase\Authentication\GetMeAction;;

class GenerateAccessTokenAction
{
  private OAuthYoutubeClientInterface $client;
  private GetMeAction $me_action;
  public function __construct(OAuthYoutubeClientInterface $client, GetMeAction $me_action)
  {
    $this->client = $client;
    $this->me_action = $me_action;
  }

  /**
   * Undocumented function
   *
   * @return TokenValue $token
   * @throws OAuthException
   */
  public function generate(): ?TokenValue
  {
    $user = $this->me_action->me();
    if ($user) {
      $youtube_token = $user->youtube_token;
      if (!$youtube_token) {
        return null;
      }

      $token = $this->client->generate_token($youtube_token->refresh_token);
      session()->put(
        YoutubeTokenSessionValue::$session_key,
        (new YoutubeTokenSessionValue($token->toArray()))->toArray()
      );
      return $token;
    }
    return null;
  }
}
