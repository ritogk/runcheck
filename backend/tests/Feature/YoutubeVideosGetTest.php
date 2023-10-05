<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Core\YouTube\TokenValue;
use App\Core\YouTube\OAuthYoutubeClientInterface;
use Google\Service\YouTube;
use App\Core\Session\YoutubeTokenSessionValue;

use App\Core\YouTube\YoutubeVideofetcherInterface;
use App\Model\User;
use \Illuminate\Support\Facades\Hash;
use Auth;

class YoutubeVideosGetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test匿名ユーザーでOAuth連携をしていない場合はエラーがでる事()
    {
        // 検証
        $response = $this->get("/api/v1/youtube/videos");
        $response->assertStatus(401);
    }

    public function test匿名ユーザーでアクセストークンの有効期限が切れた場合にエラーがでる事()
    {
        // 有効期限切れのダミークラスを作成
        $this->app->singleton(OAuthYoutubeClientInterface::class, function ($app) {
            return new class implements OAuthYoutubeClientInterface
            {
                public function get_authorize_url(): string
                {
                    return 'https://sample';
                }
                public function set_access_token(array $token): void
                {
                    return;
                }
                public function fetch_token(string $code): TokenValue
                {
                    return new TokenValue([]);
                }
                public function generate_token(string $refresh_token): TokenValue
                {
                    return new TokenValue([]);
                }
                public function generate_youtube_service(): YouTube
                {
                    return new YouTube();
                }
                public function is_access_token_expired(): bool
                {
                    return true;
                }
            };
        });

        $youtubeTokenSessionValue = new YoutubeTokenSessionValue([
            'access_token' => 'abcdefghijklmn',
            'expires_in' => 1234,
            'scope' => 'scope',
            'token_type' => 'token_Type',
            'created' => 12345,
        ]);
        session()->put($youtubeTokenSessionValue::$session_key, $youtubeTokenSessionValue->toArray());
        // 検証
        $response = $this->get("/api/v1/youtube/videos");

        $response->assertStatus(401);
    }

    public function test匿名ユーザーでアクセストークンの有効な場合に動画が取得できる事()
    {
        $this->app->singleton(OAuthYoutubeClientInterface::class, function ($app) {
            return new class implements OAuthYoutubeClientInterface
            {
                public function get_authorize_url(): string
                {
                    return 'https://sample';
                }
                public function set_access_token(array $token): void
                {
                    return;
                }
                public function fetch_token(string $code): TokenValue
                {
                    return new TokenValue([]);
                }
                public function generate_token(string $refresh_token): TokenValue
                {
                    return new TokenValue([]);
                }
                public function generate_youtube_service(): YouTube
                {
                    return new YouTube();
                }
                public function is_access_token_expired(): bool
                {
                    return false;
                }
            };
        });


        $this->app->bind(YoutubeVideofetcherInterface::class, function ($app) {
            return new class implements YoutubeVideofetcherInterface
            {
                public function fetchVideo(): array
                {
                    return [
                        [
                            'title' => '美浜サーキット',
                            'description' => '美浜サーキットの動画です',
                            'thumbnail_url' => 'https://thumbnail/mihama',
                            'id' => '1',
                            'url' => 'https://mihama'
                        ]
                    ];
                }
            };
        });

        $youtubeTokenSessionValue = new YoutubeTokenSessionValue([
            'access_token' => 'abcdefghijklmn',
            'expires_in' => 1234,
            'scope' => 'scope',
            'token_type' => 'token_Type',
            'created' => 12345,
        ]);
        session()->put($youtubeTokenSessionValue::$session_key, $youtubeTokenSessionValue->toArray());
        // 検証
        $response = $this->get("/api/v1/youtube/videos");

        $response->assertStatus(200);
        $response->assertJson([[
            'title' => '美浜サーキット',
            'description' => '美浜サーキットの動画です',
            'thumbnailUrl' => 'https://thumbnail/mihama',
            'url' => 'https://mihama'
        ]]);
    }

    public function testログイン済の状態でアクセストークンの有効期限が切れた場合にエラーがでる事()
    {
        // ログインするユーザーを作成
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
            'password' => Hash::make('P@ssword'),
        ]);
        Auth::login($user);
        // Youtube認可済のClientを作成
        $this->app->singleton(OAuthYoutubeClientInterface::class, function ($app) {
            return new class implements OAuthYoutubeClientInterface
            {
                public function get_authorize_url(): string
                {
                    return 'https://sample';
                }
                public function set_access_token(array $token): void
                {
                    return;
                }
                public function fetch_token(string $code): TokenValue
                {
                    return new TokenValue([]);
                }
                public function generate_token(string $refresh_token): TokenValue
                {
                    return new TokenValue([]);
                }
                public function generate_youtube_service(): YouTube
                {
                    return new YouTube();
                }
                public function is_access_token_expired(): bool
                {
                    return false;
                }
            };
        });

        $this->app->bind(YoutubeVideofetcherInterface::class, function ($app) {
            return new class implements YoutubeVideofetcherInterface
            {
                public function fetchVideo(): array
                {
                    return [
                        [
                            'title' => '美浜サーキット',
                            'description' => '美浜サーキットの動画です',
                            'thumbnail_url' => 'https://thumbnail/mihama',
                            'id' => '1',
                            'url' => 'https://mihama'
                        ]
                    ];
                }
            };
        });

        $youtubeTokenSessionValue = new YoutubeTokenSessionValue([
            'access_token' => 'abcdefghijklmn',
            'expires_in' => 1234,
            'scope' => 'scope',
            'token_type' => 'token_Type',
            'created' => 12345,
        ]);
        session()->put($youtubeTokenSessionValue::$session_key, $youtubeTokenSessionValue->toArray());
        // 検証
        $response = $this->get("/api/v1/youtube/videos");

        $response->assertStatus(200);
        $response->assertJson([[
            'title' => '美浜サーキット',
            'description' => '美浜サーキットの動画です',
            'thumbnailUrl' => 'https://thumbnail/mihama',
            'url' => 'https://mihama'
        ]]);
    }
}
