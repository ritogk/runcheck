<?php

namespace App\Exceptions;

use Exception;

class OAuthException extends Exception
{
  protected $message = 'OAuthError';
}
