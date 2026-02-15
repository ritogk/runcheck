<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

// UseCase
use App\UseCase\Authentication\LoginAction;
use App\UseCase\Authentication\LogoutAction;
use App\UseCase\Authentication\GetMeAction;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class AuthenticationController extends Controller
{
    /**
     * ログイン
     *
     * @param Request $request
     * @param LoginAction $acion
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
    public function logout(LogoutAction $action): JsonResponse
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
     * @param Request $request
     * @param GetMeAction $acion
     * @return JsonResponse
     */
    public function me(GetMeAction $acion): JsonResponse
    {
        $user = $acion->me();
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\User::class, $user->toArray()),
            Response::HTTP_OK
        );
    }
}
