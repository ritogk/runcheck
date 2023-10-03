<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// core
use App\Core\YouTube\IOAuthYoutubeClient;
//Domain
use App\Domain\YouTube\FetchAccessTokenAction;
use App\Domain\YouTube\FetchMyVideosAction;
use App\Domain\YouTube\SetSessionAccessTokenAction;
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
    public function authorize_url(IOAuthYoutubeClient $client): JsonResponse
    {
        $url = $client->get_authorize_url();
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\YoutubeOauthAuthorizeGet200Response::class, ['redirect_url' => $url]),
            Response::HTTP_CREATED
        );
    }

    /**
     * アクセストークンを取得
     *
     * @param Request $request
     * @param FetchAccessTokenAction $action
     * @param SetSessionAccessTokenAction $set_session_action
     * @return JsonResponse
     */
    public function access_token(Request $request, FetchAccessTokenAction $action, SetSessionAccessTokenAction $set_session_action): JsonResponse
    {
        $requestBody = new OpenAPI\Model\YoutubeOauthPostRequest($request->all());
        $token = $action->fetch($requestBody->getCode());
        $set_session_action->set($token);
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }

    /**
     * 動画一覧を取得
     *
     * @param FetchMyVideosAction $action
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
