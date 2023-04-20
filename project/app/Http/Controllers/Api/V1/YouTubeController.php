<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// service
use App\Services\YouTube\OAuthService;
use App\Services\YouTube\TokenService;
use App\Services\SessionStorage;
use App\Services\AuthenticationService;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class YouTubeController extends Controller
{
    private OAuthService $oauth_service;
    private TokenService $token_service;
    private SessionStorage $session_service;
    private AuthenticationService $authentication_service;
    public function __construct()
    {
        $this->oauth_service = new OAuthService();
        $this->session_service = new SessionStorage();
        $this->authentication_service = new AuthenticationService();
        $this->token_service = new TokenService();
    }
    /**
     * 認可画面のURLを取得
     *
     * @return JsonResponse
     */
    public function oauth_url(): JsonResponse
    {
        $url = $this->oauth_service->get_redirect_url();
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\YoutubeOauthUrlGet200Response::class, ['redirect_url' => $url]),
            Response::HTTP_CREATED
        );
    }

    /**
     * アクセストークンを取得
     *
     * @return JsonResponse
     */
    public function access_token(Request $request): JsonResponse
    {
        $requestBody = new OpenAPI\Model\YoutubeOauthPostRequest($request->all());
        $token = $this->oauth_service->fetch_token($requestBody->getCode());

        $this->session_service->put(SessionStorage::KEY_YOUTUBE_ACCESS_TOKEN, $token['access_token']);
        $user = $this->authentication_service->me();
        if ($user) {
            $this->token_service->save_refresh_token($user->id, $token['refresh_token']);
        }

        return response()->json(
            [],
            Response::HTTP_OK
        );
    }
}
