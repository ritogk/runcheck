<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// service
use App\Services\AuthenticationService;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class AuthenticationController extends Controller
{
    private AuthenticationService $authentication_service;
    public function __construct()
    {
        $this->authentication_service = new AuthenticationService();
    }

    /**
     * ログイン
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $requestBody = new OpenAPI\Model\AuthenticationLoginPostRequest($request->all());
        $user = $this->authentication_service->login($requestBody->getEmail(), $requestBody->getPassword(), $requestBody->getRemember());
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\AuthenticationLoginPostRequest::class, $user->toArray()),
            Response::HTTP_OK
        );
    }
}
