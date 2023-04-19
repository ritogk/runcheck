<?php

namespace App\Services\YouTube;

use Google_Client;
use Google_Service_YouTube;
use Google_Service_Exception;
use Google_Exception;

class OAuthService
{
  private string $client_id;
  private string $client_secret;
  private string $redirect_url;
  private Google_Client $client;
  public function __construct()
  {
    $this->client_id = config('oauth.youtube.client_id');
    $this->client_secret = config('oauth.youtube.client_secret');
    $this->redirect_url = config('oauth.youtube.redirect_url');
    $client = new Google_Client();
    $client->setClientId($this->client_id);
    $client->setClientSecret($this->client_secret);
    $client->setScopes('https://www.googleapis.com/auth/youtube');
    $client->setRedirectUri($this->redirect_url);
    $this->client = $client;
  }

  public function get_client(): Google_Client
  {
    return $this->client;
  }

  public function get_redirect_url(): string
  {
    return $this->client->createAuthUrl();
  }

  public function fetch_token(string $code): string
  {
    $result = $this->client->fetchAccessTokenWithAuthCode($code);
    return $result['access_token'];
  }
}
