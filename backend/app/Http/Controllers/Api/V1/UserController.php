<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// UseCase
use App\UseCase\User\RegisterUserAction;
// openapi
use App\OpenAPI;

class UserController extends Controller
{
    /**
     * 登録
     *
     * @param Request $request
     * @param RegisterUserAction $action
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
            ['id' => $user->getId(), 'name' => $user->getName()],
            Response::HTTP_CREATED
        );
    }
}
