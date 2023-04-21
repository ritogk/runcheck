<?php

namespace App\Http\Middleware;

use Closure;
use App\Exceptions\OAuthException;
// core
use App\Core\YouTube\OAuthYoutubeClient;
// usecase
use App\UseCase\Authentication\MeAction;
use App\UseCase\SessionStorageAction;
use App\UseCase\YouTube\GenerateAccessTokenAction;

/**
 * 役割:Youtube用のトークンの有効性チェック or トークンの更新
 */
class ValidateYoutubeToken
{
    private OAuthYoutubeClient $client;
    private SessionStorageAction $session_action;
    private MeAction $me_action;
    private GenerateAccessTokenAction $generate_access_token_action;
    public function __construct(OAuthYoutubeClient $client, SessionStorageAction $session_action, MeAction $me_action, GenerateAccessTokenAction $generate_access_token_action)
    {
        $this->client = $client;
        $this->session_action = $session_action;
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
        $session_token = $this->session_action->get(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN);
        $user = $this->me_action->me();
        if ($user) {
            if ($session_token) {
                $this->client->set_access_token($session_token);
                if ($this->client->is_access_token_expired()) {
                    // トークンの有効期限が切れていたらリフレッシュトークンからアクセストークンを生成
                    $new_token = $this->generate_access_token_action->generate();
                    if (!$new_token) {
                        $this->session_action->put(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN, $new_token);
                    } else {
                        throw new OAuthException();
                    }
                }
            } else {
                // リフレッシュトークンからアクセストークンを生成
                $new_token = $this->generate_access_token_action->generate();
                if ($new_token) {
                    $this->session_action->put(SessionStorageAction::KEY_YOUTUBE_ACCESS_TOKEN, $new_token);
                } else {
                    throw new OAuthException();
                }
            }
        } else {
            // 未ログインかつtokenがセットされていない場合はエラー
            if (!$session_token) throw new OAuthException();
            if (!is_array($session_token)) throw new OAuthException();
            $this->client->set_access_token($session_token);
            // アクセストークンの有効期限切れの場合はエラー
            if ($this->client->is_access_token_expired()) throw new OAuthException();
        }
        return $next($request);
    }
}
