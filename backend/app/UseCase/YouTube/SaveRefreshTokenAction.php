<?php

namespace App\UseCase\YouTube;

use App\UseCase\YouTube\Repository\YoutubeTokenRepository;

class SaveRefreshTokenAction
{
  private YoutubeTokenRepository $youtubeTokenRepository;
  public function __construct(YoutubeTokenRepository $youtubeTokenRepository)
  {
    $this->youtubeTokenRepository = $youtubeTokenRepository;
  }

  /**
   * Undocumented function
   *
   * @param integer $user_id
   * @param string $refresh_token
   * @return void
   */
  public function save(int $user_id, string $refresh_token): void
  {
    $this->youtubeTokenRepository->saveToken($user_id, $refresh_token);
  }
}
