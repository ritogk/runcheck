<?php

namespace App\Http\Middleware;

use Closure;
use App\Exceptions\OAuthException;
// core
use App\Core\YouTube\IOAuthYoutubeClient;
use App\Core\Session\YoutubeTokenSessionValue;
// UseCase
use App\UseCase\Authentication\GetMeAction;
use App\UseCase\YouTube\GenerateAccessTokenAction;

/**
 * Youtubeアクセストークンの有効性をチェック と 更新を行う。
 */
class ValidateYoutubeToken
{
    private IOAuthYoutubeClient $client;
    private GetMeAction $me_action;
    private GenerateAccessTokenAction $generate_access_token_action;
    public function __construct(IOAuthYoutubeClient $client, GetMeAction $me_action, GenerateAccessTokenAction $generate_access_token_action)
    {
        $this->client = $client;
        $this->me_action = $me_action;
        $this->generate_access_token_action = $generate_access_token_action;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $session_token = session()->get(YoutubeTokenSessionValue::$session_key);
        $user = $this->me_action->me();
        if ($user) {
            $this->process_user($session_token);
        } else {
            $this->process_anonymous($session_token);
        }
        return $next($request);
    }

    // ログイン済ユーザーの処理
    private function process_user(?array $session_token)
    {
        if ($session_token) {
            $this->client->set_access_token($session_token);
            if ($this->client->is_access_token_expired()) {
                // トークンの有効期限が切れていたらリフレッシュトークンからアクセストークンを生成
                $this->generate_access_token_action->generate();
            }
        } else {
            // ログインしたて場合はアクセストークンがセッションに保持されていないのでアクセストークンを生成する
            $this->generate_access_token_action->generate();
        }
    }

    // 未ログインの処理
    private function process_anonymous(?array $session_token)
    {
        $session_token = session()->get(YoutubeTokenSessionValue::$session_key);
        // Oauth連携されていない場合はエラー。
        if (!$session_token || !is_array($session_token)) {
            throw new OAuthException();
        }
        $this->client->set_access_token($session_token);
        // アクセストークンの有効期限切れの場合はエラー
        if ($this->client->is_access_token_expired()) {
            throw new OAuthException();
        }
    }
}
