<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Exceptions\OAuthException;
// core
use App\Core\YouTube\OAuthYoutubeClient;
//usecase
use App\UseCase\YouTube\FetchAccessTokenAction;
use App\UseCase\YouTube\FetchMyVideosAction;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class YouTubeController extends Controller
{
    /**
     * 認可画面のURLを取得
     *
     * @return JsonResponse
     */
    public function authorize_url(): JsonResponse
    {
        $client = new OAuthYoutubeClient();
        $url = $client->get_authorize_url();
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\YoutubeOauthAuthorizeGet200Response::class, ['redirect_url' => $url]),
            Response::HTTP_CREATED
        );
    }

    /**
     * アクセストークンを取得
     *
     * @return JsonResponse
     */
    public function access_token(Request $request, FetchAccessTokenAction $action): JsonResponse
    {
        $requestBody = new OpenAPI\Model\YoutubeOauthPostRequest($request->all());
        $token = $action->fetch($requestBody->getCode());
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }

    /**
     * 動画一覧を取得
     *
     * @return JsonResponse
     */
    public function videos(FetchMyVideosAction $action): JsonResponse
    {
        $videos = $action->fetch();
        return response()->json(
            OpenAPIUtility::dicstionariesToModelContainers(OpenAPI\Model\YoutubeVideosGet200ResponseInner::class, $videos),
            Response::HTTP_OK
        );
    }
}
