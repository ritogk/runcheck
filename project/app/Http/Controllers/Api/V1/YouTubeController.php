<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// service
use App\Services\YouTube\OAuthService;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class YouTubeController extends Controller
{
    private OAuthService $oauth_service;
    public function __construct()
    {
        $this->oauth_service = new OAuthService();
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
}
