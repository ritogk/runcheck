<?php

namespace App\Core\YouTube;

use App\Core\YouTube\OAuthYoutubeClientInterface;
use App\Core\YouTube\YoutubeVideofetcherInterface;

class YoutubeVideofetcher implements YoutubeVideofetcherInterface
{
  public function __construct(private readonly OAuthYoutubeClientInterface $client)
  {
  }

  public function fetchVideo(): array
  {
    $youtube = $this->client->generate_youtube_service();
    $channelsResponse = $youtube->channels->listChannels('contentDetails', array(
      'mine' => 'true',
    ));

    $channelsResponse = $youtube->channels->listChannels('contentDetails', array(
      'mine' => 'true',
    ));

    $nextPageToken = '';
    $videos = [];
    while (true) {
      foreach ($channelsResponse['items'] as $channel) {
        $uploadsListId = $channel['contentDetails']['relatedPlaylists']['uploads'];
        $playlistItemsResponse = $youtube->playlistItems->listPlaylistItems('snippet', array(
          'playlistId' => $uploadsListId,
          'maxResults' => 50,
          'pageToken' => $nextPageToken,
        ));

        foreach ($playlistItemsResponse['items'] as $playlistItem) {
          // 削除された動画はレスポンスが特殊なのでスキップ。
          if ($playlistItem['snippet']['title'] == "Deleted video") {
            continue;
          }
          $videos[] = array(
            'title' => $playlistItem['snippet']['title'],
            'description' => $playlistItem['snippet']['description'],
            'thumbnail_url' => $playlistItem['snippet']['thumbnails']['default']['url'],
            'id' => $playlistItem['snippet']['resourceId']['videoId'],
            'url' => sprintf("https://www.youtube.com/embed/%s", $playlistItem['snippet']['resourceId']['videoId'])
          );
        }
        $nextPageToken = $playlistItemsResponse['nextPageToken'];
      }
      if (!$nextPageToken) break;
    }
    return $videos;
  }
}
