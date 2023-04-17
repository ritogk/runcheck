<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// openapi
use App\OpenAPI\Model;
use App\Libs\OpenAPIUtility;

class UserController extends Controller
{
    // /**
    //  * 会員 登録
    //  *
    //  * @param  UserRequest $request
    //  * @param  CreateAction $action
    //  * @return JsonResponse
    //  */
    // public function create(Request $request): JsonResponse
    // {
    //     $requestBody = new Model\User($request->all());
    //     $result = $action(
    //         $requestBody->getHundleName(),
    //         $requestBody->getEmail(),
    //         $requestBody->getPassword(),
    //         $requestBody->getSelfPr(),
    //         $requestBody->getTel()
    //     );
    //     return response()->json(
    //         OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\User::class, $result),
    //         Response::HTTP_CREATED
    //     );
    // }
}
