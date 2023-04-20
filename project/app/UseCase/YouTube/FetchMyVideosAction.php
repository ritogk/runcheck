<?php

namespace App\UseCase\YouTube;

// core
use App\Core\YouTube\OAuthYoutubeClient;
// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\SessionStorageAction;

class FetchMyVideosAction
{
  private OAuthYoutubeClient $client;
  private SessionStorageAction $session_action;
  private MeAction $me_action;
  public function __construct(OAuthYoutubeClient $client, SessionStorageAction $session_action, MeAction $me_action)
  {
    $this->client = $client;
    $this->session_action = $session_action;
    $this->me_action = $me_action;
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
    if ($this->client->is_access_token_expired()) {
      // 有効期限切れの場合はリフレッシュトークンを使って更新。
      $user = $this->me_action->me();
      if (!$user) return [];
      $token = $this->client->generate_token($user->id);
      $this->session_action->put(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN, $token);
    }

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
          $videos[] = array(
            'title' => $playlistItem['snippet']['title'],
            'description' => $playlistItem['snippet']['description'],
            'thumbnail_url' => $playlistItem['snippet']['thumbnails']['default']['url'],
            'id' => $playlistItem['snippet']['resourceId']['videoId'],
            'url' => sprintf("https://www.youtube.com/watch?v=%s", $playlistItem['snippet']['resourceId']['videoId'])
          );
        }
        $nextPageToken = $playlistItemsResponse['nextPageToken'];
      }
      if (!$nextPageToken) break;
    }
    return $videos;
  }
}
