<?php

namespace App\Exceptions;

use Exception;

class OAuthException extends Exception
{
  protected $message = 'OAuthError';
  public function report()
  {
    // slackにエラーログが飛びまくるので送信させない
  }
}
