<?php

namespace App\Core\YouTube;

use Google_Client;
use Google\Service\YouTube;
use App\Core\YouTube\TokenValue;
use App\Exceptions\OAuthException;

interface IOAuthYoutubeClient
{
  public function get_authorize_url(): string;
  public function set_access_token(array $token): void;
  public function fetch_token(string $code): TokenValue;
  public function generate_token(string $refresh_token): TokenValue;
  public function generate_youtube_service(): YouTube;
  public function is_access_token_expired(): bool;
}

class OAuthYoutubeClient implements IOAuthYoutubeClient
{
  const expires_in = 3600;
  private string $client_id;
  private string $client_secret;
  private string $redirect_url;
  private Google_Client $client;
  public function __construct(Google_Client $client, string $client_id, string $client_secret, string $redirect_url)
  {
    $this->client_id = $client_id;
    $this->client_secret = $client_secret;
    $this->redirect_url = $redirect_url;
    $client->getCache()->clear();         // トークンがメモリにキャッシュされるので必ずリセットする
    $client->setClientId($this->client_id);
    $client->setClientSecret($this->client_secret);
    $client->setScopes('https://www.googleapis.com/auth/youtube.readonly');
    $client->setRedirectUri($this->redirect_url);
    $client->setAccessType('offline');    // リフレッシュトークンからアクセストークンを生成するために必要なオプション
    $client->setApprovalPrompt('force');  // リフッシュトークンを取得するために必要
    $client->setPrompt('consent');        // アプリとGoogleとを連携する時に毎回アクセス許可用の同意画面を表示させる
    $this->client = $client;
  }

  /**
   * 認可画面のURLを取得
   *
   * @return string
   */
  public function get_authorize_url(): string
  {
    return $this->client->createAuthUrl();
  }

  /**
   * アクセストークンをセット
   *
   * @param array{access_token: string, expires_in: int, refresh_token: string, scope: string}
   * @return void
   * @throws OAuthException
   */
  public function set_access_token(array $token): void
  {
    try {
      $token['expires_in'] = self::expires_in;
      $this->client->setAccessToken($token);
    } catch (\Exception $th) {
      throw new OAuthException();
    }
  }

  /**
   * アクセストークンを取得
   *
   * @param string $code
   * @return TokenValue
   * @throws OAuthException
   */
  public function fetch_token(string $code): TokenValue
  {
    try {
      $token = new TokenValue($this->client->fetchAccessTokenWithAuthCode($code));
    } catch (\Exception $th) {
      throw new OAuthException();
    }
    return $token;
  }

  /**
   * アクセストークンの更新
   *
   * @param string $refresh_token
   * @return TokenValue
   * @throws OAuthException
   */
  public function generate_token(string $refresh_token): TokenValue
  {
    try {
      $token = new TokenValue($this->client->fetchAccessTokenWithRefreshToken($refresh_token));
    } catch (\Exception $th) {
      throw new OAuthException();
    }
    return $token;
  }

  /**
   * Youtubeサービス作成
   *
   * @return YouTube
   */
  public function generate_youtube_service(): YouTube
  {
    return new YouTube($this->client);
  }

  /**
   * トークンの有効期限切れチェック
   *
   * @return boolean
   */
  public function is_access_token_expired(): bool
  {
    return $this->client->isAccessTokenExpired();
  }
}
