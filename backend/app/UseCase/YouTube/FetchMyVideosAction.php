<?php

namespace App\UseCase\YouTube;

// core
use App\Core\Session\YoutubeTokenSessionValue;
use App\Core\YouTube\YoutubeVideofetcherInterface;

class FetchMyVideosAction
{
  public function __construct(private readonly YoutubeVideofetcherInterface $featcher)
  {
  }

  /**
   * fetch
   *
   * @return array<int, array{title:string, description:int, thumbnail_url:string, id:int, url:string}>
   */
  public function fetch(): array
  {
    return $this->featcher->fetchVideo();
  }
}
