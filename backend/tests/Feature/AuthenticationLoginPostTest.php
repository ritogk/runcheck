<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use \Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Model\User;

class AuthenticationLoginPostTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test存在するユーザーの場合は成功する事()
    {
        // 準備
        User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
            'password' => Hash::make('P@ssword'),
        ]);

        // 検証
        $response = $this->post('/api/v1/authentication/login', [
            "email" => 'test@example.com',
            "password" => 'P@ssword',
            "remember" => true
        ]);
        $response->assertStatus(200);
    }

    public function test存在しないユーザーは失敗する事()
    {
        $response = $this->post('/api/v1/authentication/login', [
            "email" => 'inaiyo@example.com',
            "password" => 'P@ssword',
            "remember" => true
        ]);
        $response->assertStatus(401);
    }
}
