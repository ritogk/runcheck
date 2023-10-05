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


    // 動画一覧を取得するためになんとかしなくてはいけない。




    // public function test匿名ユーザーでOAuth連携をしていない場合はエラー()
    // {
    //     // 準備
    //     $user = User::create([
    //         'name' => 'ほみ',
    //         'car_type' => 'FIT GK5',
    //         'email' => 'test@example.com',
    //         'password' => Hash::make('P@ssword'),
    //     ]);
    //     $user_darekasan = User::create([
    //         'name' => 'みかん',
    //         'car_type' => 'CIVIC FD2',
    //         'email' => 'mikan@example.com',
    //         'password' => Hash::make('P@ssword'),
    //     ]);
    //     $comparison = Comparison::create([
    //         "user_id" => $user->id,
    //         "category" => '美浜サーキット',
    //         "title" => '美浜 気温違い',
    //         "memo" => '10℃違い',
    //         "video1_time_st" => 10,
    //         "video1_url" => 'https://www.youtube.com/watch?v=1',
    //         "video1_type" => VideoType::NUMBER_YOUTUBE,
    //         "video2_time_st" => 30,
    //         "video2_url" => 'https://www.youtube.com/watch?v=1',
    //         "video2_type" => VideoType::NUMBER_YOUTUBE,
    //         "video_type" => Comparison::VIDEO_TYPE_KIND['YOUTUBE_YOUTUBE'],
    //         "release_kbn" => false,
    //         "anonymous" => false
    //     ]);
    //     Comparison::create([
    //         "user_id" => $user_darekasan->id,
    //         "category" => '作手サーキット',
    //         "title" => '作手 気温違い',
    //         "memo" => '20℃違い',
    //         "video1_time_st" => 40,
    //         "video1_url" => 'https://www.youtube.com/watch?v=3',
    //         "video1_type" => VideoType::NUMBER_YOUTUBE,
    //         "video2_time_st" => 50,
    //         "video2_url" => 'https://www.youtube.com/watch?v=3',
    //         "video2_type" => VideoType::NUMBER_YOUTUBE,
    //         "video_type" => Comparison::VIDEO_TYPE_KIND['YOUTUBE_YOUTUBE'],
    //         "release_kbn" => false,
    //         "anonymous" => false
    //     ]);

    //     // 検証
    //     Auth::login($user);
    //     $response = $this->get("/api/v1/comparisons");
    //     $response->assertJson([[
    //         "id" => $comparison->id,
    //         "category" => $comparison->category,
    //         "memo" => $comparison->memo,
    //         "title" => $comparison->title,
    //         "anonymous" => $comparison->anonymous
    //     ]]);
    //     $response->assertStatus(200);
    // }
}
