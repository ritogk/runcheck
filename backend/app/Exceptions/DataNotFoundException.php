<?php

namespace App\Exceptions;

use Exception;

class DataNotFoundException extends Exception
{
  protected $message = "データが存在しませんでした。";
}
