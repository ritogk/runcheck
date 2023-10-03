<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use \Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Model\User;
use App\Core\Session\YoutubeTokenSessionValue;

class AuthenticationLogoutPostTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function testログアウト後にセッション情報が削除される事()
    {
        // 準備
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
            'password' => Hash::make('P@ssword'),
        ]);
        Auth::login($user);
        session()->put(YoutubeTokenSessionValue::$session_key, 'value');

        // 検証
        $response = $this->actingAs($user)->post('/api/v1/authentication/logout');
        $response->assertStatus(200);

        $this->assertTrue(!Auth::guard()->check());
        $this->assertTrue(!session()->has(YoutubeTokenSessionValue::$session_key));
    }
}
