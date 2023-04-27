<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// usecase
use App\UseCase\RegisterUserAction;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class UserController extends Controller
{
    /**
     * 登録
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function create(Request $request, RegisterUserAction $action): JsonResponse
    {
        $requestBody = new OpenAPI\Model\UsersPostRequest($request->all());
        $user = $action->register(
            $requestBody->getHandleName(),
            $requestBody->getCarType(),
            $requestBody->getEmail(),
            $requestBody->getPassword()
        );
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\User::class, $user->toArray()),
            Response::HTTP_CREATED
        );
    }
}
