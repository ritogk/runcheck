<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
//usecase
use App\UseCase\GetStatusAction;

class StatusController extends Controller
{
    /**
     * 未ログインユーザーも含めたユーザーの状態を取得
     *
     * @return JsonResponse
     */
    public function status(GetStatusAction $action): JsonResponse
    {
        $result = $action->status();
        $user = $result['user'];
        return response()->json(
            ['isLogined' => $result['is_logined'],
            'isYoutubeAuthroized' => $result['is_youtube_authroized'],
            'user' => ['id' => $user ? $user['id'] : 0, 'name' => $user ? $user['name'] : ""]],
            Response::HTTP_OK
        );
    }
}
