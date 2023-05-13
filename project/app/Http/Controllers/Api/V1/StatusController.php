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
        return response()->json(
            ['is_logined' => $result['is_logined'], 'is_youtube_authroized' => $result['is_youtube_authroized'], 'user' => $result['user']],
            Response::HTTP_OK
        );
    }
}
