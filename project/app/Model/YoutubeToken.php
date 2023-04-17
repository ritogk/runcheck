<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class YoutubeToken extends Model
{
    protected $guarded = ['id']; // ブラックリスト

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
