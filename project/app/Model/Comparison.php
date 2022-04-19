<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    protected $guarded = ['id']; // ブラックリスト

    // select2用データ
    public static function getSelect2Data($user_id, $video_type)
    {
        $data = array();
        $category = Comparison::select('category')
            ->where("user_id", "=", $user_id)
            ->where("video_type", "=", $video_type)
            ->groupBy('category')
            ->pluck('category');
        $data += array("" => ""); // 先頭に空白のoptionがないとプレースホルダが表示されない。
        foreach ($category as $key => $category_value) {
            $comparison = Comparison::where("category", "=", $category_value)
                ->where("user_id", "=", $user_id)
                ->where("video_type", "=", $video_type)
                ->pluck('title', 'id');
            $data += array($category_value => $comparison);
        }
        return $data;
    }

    // home用データ
    public static function categorySelDataGet($user_id)
    {
        $data = array();
        $category = Comparison::select('category')
            ->where("user_id", "=", $user_id)
            ->groupBy('category')
            ->pluck('category');
        return $data;
    }
}
