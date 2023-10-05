<?php

namespace App\Core\YouTube;

interface YoutubeVideofetcherInterface
{
  /**
   * @return array<int, array{title:string, description:int, thumbnail_url:string, id:int, url:string}>
   */
  public function fetchVideo(): array;
}
