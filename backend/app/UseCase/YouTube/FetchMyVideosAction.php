<?php

namespace App\UseCase\YouTube;

use App\Exceptions\OAuthException;
// core
use App\Core\YouTube\OAuthYoutubeClient;
// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\SessionStorageAction;
use App\UseCase\YouTube\GenerateAccessTokenAction;

class FetchMyVideosAction
{
  private OAuthYoutubeClient $client;
  private SessionStorageAction $session_action;
  public function __construct(OAuthYoutubeClient $client, SessionStorageAction $session_action)
  {
    $this->client = $client;
    $this->session_action = $session_action;
  }

  /**
   * fetch
   *
   * @return array{title: string, description: int, thumbnail_url: string, id: int, string url}[]
   */
  public function fetch(): array
  {
    $token = $this->session_action->get(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN);
    $this->client->set_access_token($token);

    $youtube = $this->client->generate_youtube_service();
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
          // 削除された動画は無視。レスポンスがおかしいのでこの先に流すとエラーになる。
          if($playlistItem['snippet']['title'] == "Deleted video"){
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