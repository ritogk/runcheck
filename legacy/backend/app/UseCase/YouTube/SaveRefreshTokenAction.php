<?php

namespace App\UseCase\YouTube;

use App\UseCase\YouTube\Repository\IYoutubeTokenRepository;

class SaveRefreshTokenAction
{
  private IYoutubeTokenRepository $youtubeTokenRepository;
  public function __construct(IYoutubeTokenRepository $youtubeTokenRepository)
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
