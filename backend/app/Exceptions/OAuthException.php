<?php

namespace App\Exceptions;

use Exception;

class OAuthException extends Exception
{
  protected $message = 'OAuthError';
  public function report()
  {
    // エラーログ送信の送信をさせない
  }
}
