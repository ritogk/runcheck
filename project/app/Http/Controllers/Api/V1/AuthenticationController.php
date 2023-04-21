<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

// usecases
use App\UseCase\Authentication\LoginAction;
use App\UseCase\Authentication\LogoutAction;
use App\UseCase\Authentication\MeAction;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class AuthenticationController extends Controller
{
    /**
     * ログイン
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function login(Request $request, LoginAction $acion): JsonResponse
    {
        $requestBody = new OpenAPI\Model\AuthenticationLoginPostRequest($request->all());
        $user = $acion->login($requestBody->getEmail(), $requestBody->getPassword(), $requestBody->getRemember());
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\User::class, $user->toArray()),
            Response::HTTP_OK
        );
    }

    /**
     * ログアウト
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function logout(Request $request, LogoutAction $action): JsonResponse
    {
        $action->logout();
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }

    /**
     * ログイン中のユーザー情報を返す
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function me(Request $request, MeAction $acion): JsonResponse
    {
        $user = $acion->me();
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\User::class, $user->toArray()),
            Response::HTTP_OK
        );
    }
}
