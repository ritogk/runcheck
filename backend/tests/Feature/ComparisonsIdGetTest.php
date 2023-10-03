<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use \Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Model\User;
use App\Model\Comparison;
use App\OpenAPI\Model\VideoType;
use Auth;

class ComparisonsIdGetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test非公開情報は本人のみ取得できる事()
    {
        // 準備
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
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

        // 検証
        $response = $this->get(sprintf("/api/v1/comparisons/%s", $comparison->id));
        $response->assertStatus(403);

        Auth::login($user);
        $response = $this->get(sprintf("/api/v1/comparisons/%s", $comparison->id));
        $response->assertStatus(200);
        $response->assertJson([
            "category" => $comparison->category,
            "memo" => $comparison->memo,
            "title" => $comparison->title,
            "video1Url" => $comparison->video1_url,
            "video1TimeSt" => $comparison->video1_time_st,
            "video1VideoType" => $comparison->video1_type,
            "video2Url" => $comparison->video2_url,
            "video2VideoType" => $comparison->video2_type,
            "anonymous" => $comparison->anonymous
        ]);
    }

    public function test公開情報は誰でも取得できる事()
    {
        // 準備
        $user = User::create([
            'name' => 'ほみ',
            'car_type' => 'FIT GK5',
            'email' => 'test@example.com',
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
            "release_kbn" => true,
            "anonymous" => false
        ]);

        // 未ログインユーザーで取得できる。
        $response = $this->get(sprintf("/api/v1/comparisons/%s", $comparison->id));
        $response->assertStatus(200);
        $response->assertJson([
            "category" => $comparison->category,
            "memo" => $comparison->memo,
            "title" => $comparison->title,
            "video1Url" => $comparison->video1_url,
            "video1TimeSt" => $comparison->video1_time_st,
            "video1VideoType" => $comparison->video1_type,
            "video2Url" => $comparison->video2_url,
            "video2VideoType" => $comparison->video2_type,
            "anonymous" => $comparison->anonymous
        ]);

        // ログイン済のユーザーでも取得できる。
        Auth::login($user);
        $response = $this->get(sprintf("/api/v1/comparisons/%s", $comparison->id));
        $response->assertStatus(200);
        $response->assertJson([
            "category" => $comparison->category,
            "memo" => $comparison->memo,
            "title" => $comparison->title,
            "video1Url" => $comparison->video1_url,
            "video1TimeSt" => $comparison->video1_time_st,
            "video1VideoType" => $comparison->video1_type,
            "video2Url" => $comparison->video2_url,
            "video2VideoType" => $comparison->video2_type,
            "anonymous" => $comparison->anonymous
        ]);
    }
}
