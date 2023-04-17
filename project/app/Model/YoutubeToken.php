<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Model\YoutubeToken
 *
 * @property int $id
 * @property int $user_id
 * @property string $refresh_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Model\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken whereRefreshToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\YoutubeToken whereUserId($value)
 * @mixin \Eloquent
 */
class YoutubeToken extends Model
{
    use SoftDeletes;
    protected $guarded = ['id']; // ブラックリスト

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
