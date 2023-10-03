<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsersPostTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test正常()
    {
        $response = $this->post('/api/v1/users', [
            "handleName" => "ほみ",
            "carType" => "FIT GK5",
            "email" => "test@test.comtest",
            "password" => "P@ssw0rd"
        ]);
        $response->assertStatus(201);
    }

    public function test必須パラメーターなし()
    {
        $response = $this->post('/api/v1/users', [
            "handleName" => "",
            "carType" => "",
            "email" => "",
            "password" => ""
        ]);
        $response->assertStatus(500);
    }
}
