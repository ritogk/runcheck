<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
//usecase
use App\UseCase\GetClientStatusAction;

class StatusController extends Controller
{
    /**
     * クライアントの状態を取得
     *
     * @param GetClientStatusAction $action
     * @return JsonResponse
     */
    public function status(GetClientStatusAction $action): JsonResponse
    {
        $result = $action->get_status();
        $user = $result['user'];
        return response()->json(
            [
                'isLogined' => $result['is_logined'],
                'isYoutubeAuthroized' => $result['is_youtube_authroized'],
                'user' => ['id' => $user ? $user['id'] : 0, 'name' => $user ? $user['name'] : ""]
            ],
            Response::HTTP_OK
        );
    }
}
