<?php

namespace App\Core\YouTube;

use Google\Service\YouTube;
use App\Core\YouTube\TokenValue;

interface OAuthYoutubeClientInterface
{
  public function get_authorize_url(): string;
  public function set_access_token(array $token): void;
  public function fetch_token(string $code): TokenValue;
  public function generate_token(string $refresh_token): TokenValue;
  public function generate_youtube_service(): YouTube;
  public function is_access_token_expired(): bool;
}
