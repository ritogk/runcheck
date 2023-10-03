<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use \Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Core\Session\YoutubeTokenSessionValue;
use App\Model\User;
use App\Model\YoutubeToken;
use Auth;

class StatusGetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function testログイン済かつYoutube未認可の場合に正しいレスポンスが返ってくる事()
    {
        // 準備
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
            'password' => Hash::make('P@ssword'),
        ]);

        // 検証
        Auth::login($user);
        $response = $this->get("/api/v1/status");
        $response->assertJson([
            "isLogined" => true,
            "isYoutubeAuthroized" => false,
            "user" => [
                'id' => 1,
                'name' => $user->name
            ],
        ]);
        $response->assertStatus(200);
    }

    public function testログイン済かつYoutube認可済の場合に正しいレスポンスが返ってくる事()
    {
        // 準備
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
            'password' => Hash::make('P@ssword'),
        ]);
        YoutubeToken::create([
            'user_id' => $user->id,
            'refresh_token' => 'xxxxxxxxxxxx',
        ]);
        session()->put(YoutubeTokenSessionValue::$session_key, 'yyyyyyyyyyyyyy');

        // 検証
        Auth::login($user);
        $response = $this->get("/api/v1/status");
        $response->assertJson([
            "isLogined" => true,
            "isYoutubeAuthroized" => true,
            "user" => [
                'id' => 1,
                'name' => $user->name
            ],
        ]);
        $response->assertStatus(200);
    }

    public function test未ログインの時に正しいレスポンスが返ってくる事()
    {
        // 検証
        $response = $this->get("/api/v1/status");
        $response->assertJson([
            "isLogined" => false,
            "isYoutubeAuthroized" => false,
            "user" => [
                'id' => 0,
                'name' => ''
            ],
        ]);
        $response->assertStatus(200);
    }

    public function test未ログインでYoutube認可済の時に正しいレスポンスが返ってくる事()
    {
        // 準備
        session()->put(YoutubeTokenSessionValue::$session_key, 'yyyyyyyyyyyyyy');

        // 検証
        $response = $this->get("/api/v1/status");
        $response->assertJson([
            "isLogined" => false,
            "isYoutubeAuthroized" => true,
            "user" => [
                'id' => 0,
                'name' => ''
            ],
        ]);
        $response->assertStatus(200);
    }
}
