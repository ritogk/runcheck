<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use \Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Model\User;
use App\Model\Comparison;
use App\OpenAPI\Model\VideoType;
use Auth;

class ComparisonsGetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test本人の情報のみ取得できる事()
    {
        // 準備
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
            'password' => Hash::make('P@ssword'),
        ]);
        $user_darekasan = User::create([
            'name' => 'みかん',
            'car_type' => 'CIVIC FD2',
            'email' => 'mikan@example.com',
            'password' => Hash::make('P@ssword'),
        ]);
        $comparison = Comparison::create([
            "user_id" => $user->id,
            "category" => '美浜サーキット',
            "title" => '美浜 気温違い',
            "memo" => '10℃違い',
            "video1_time_st" => 10,
            "video1_url" => 'https://www.youtube.com/watch?v=1',
            "video1_type" => VideoType::NUMBER_YOUTUBE,
            "video2_time_st" => 30,
            "video2_url" => 'https://www.youtube.com/watch?v=1',
            "video2_type" => VideoType::NUMBER_YOUTUBE,
            "video_type" => Comparison::VIDEO_TYPE_KIND['YOUTUBE_YOUTUBE'],
            "release_kbn" => false,
            "anonymous" => false
        ]);
        Comparison::create([
            "user_id" => $user_darekasan->id,
            "category" => '作手サーキット',
            "title" => '作手 気温違い',
            "memo" => '20℃違い',
            "video1_time_st" => 40,
            "video1_url" => 'https://www.youtube.com/watch?v=3',
            "video1_type" => VideoType::NUMBER_YOUTUBE,
            "video2_time_st" => 50,
            "video2_url" => 'https://www.youtube.com/watch?v=3',
            "video2_type" => VideoType::NUMBER_YOUTUBE,
            "video_type" => Comparison::VIDEO_TYPE_KIND['YOUTUBE_YOUTUBE'],
            "release_kbn" => false,
            "anonymous" => false
        ]);

        // 検証
        Auth::login($user);
        $response = $this->get("/api/v1/comparisons");
        $response->assertJson([[
            "id" => $comparison->id,
            "category" => $comparison->category,
            "memo" => $comparison->memo,
            "title" => $comparison->title,
            "anonymous" => $comparison->anonymous
        ]]);
        $response->assertStatus(200);
    }
}
