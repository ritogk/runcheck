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
 * 役割:Youtube用のトークンの有効性チェック or トークンの更新
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
            if ($session_token) {
                $this->client->set_access_token($session_token);
                if ($this->client->is_access_token_expired()) {
                    // トークンの有効期限が切れていたらリフレッシュトークンからアクセストークンを生成
                    $new_token = $this->generate_access_token_action->generate();
                    if ($new_token) {
                        session()->put(
                            YoutubeTokenSessionValue::$session_key,
                            new YoutubeTokenSessionValue($new_token->toArray())
                        );
                    } else {
                        throw new OAuthException();
                    }
                }
            } else {
                // リフレッシュトークンからアクセストークンを生成
                $new_token = $this->generate_access_token_action->generate();
                if ($new_token) {
                    session()->put(
                        YoutubeTokenSessionValue::$session_key,
                        new YoutubeTokenSessionValue($new_token->toArray())
                    );
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
