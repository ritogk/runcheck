<?php

namespace App\Services;

class SessionStorage
{
  // セッションのキー
  const KEY_YOUTUBE_ACCESS_TOKEN = 'YOUTUBE_ACCESS_TOKEN';

  /**
   * セッションに値をセットする
   *
   * @param string $key
   * @param $value
   * @return void
   */
  public function put(string $key, $value)
  {
    session()->put($key, $value);
  }

  /**
   * セッションから値を取得する
   * セッションキーが存在しない場合はnullが変える
   *
   * @param string $key
   * @return mixed
   */
  public function get(string $key)
  {
    return session()->get($key);
  }
}
