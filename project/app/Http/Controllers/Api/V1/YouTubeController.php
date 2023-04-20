<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// core
use App\Core\YouTube\OAuthYoutubeClient;
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
        $oauth_client = new OAuthYoutubeClient();
        $url = $oauth_client->get_redirect_url();
        return response()->json(
            OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\YoutubeOauthAuthorizeGet200Response::class, ['redirect_url' => $url]),
            Response::HTTP_CREATED
        );
    }

    // /**
    //  * アクセストークンを取得
    //  *
    //  * @return JsonResponse
    //  */
    // public function access_token(Request $request): JsonResponse
    // {
    //     $requestBody = new OpenAPI\Model\YoutubeOauthPostRequest($request->all());
    //     $token = $this->oauth_service->fetch_token($requestBody->getCode());
    //     $this->session_service->put(SessionStorage::KEY_YOUTUBE_ACCESS_TOKEN, $token);
    //     $user = $this->authentication_service->me();
    //     if ($user) {
    //         $this->token_service->save_refresh_token($user->id, $token['refresh_token']);
    //     }

    //     return response()->json(
    //         [],
    //         Response::HTTP_OK
    //     );
    // }

    // /**
    //  * 動画一覧を取得
    //  *
    //  * @return JsonResponse
    //  */
    // public function videos(): JsonResponse
    // {
    //     $token = $this->session_service->get(SessionStorage::KEY_YOUTUBE_ACCESS_TOKEN);
    //     $client = $this->oauth_service->get_client();
    //     $client->setAccessToken($token);
    //     if ($client->isAccessTokenExpired()) {
    //         \Log::debug('トークン無効');
    //         $user = $this->authentication_service->me();
    //         $token = $this->oauth_service->generate_token($user->id);
    //         $this->session_service->put(SessionStorage::KEY_YOUTUBE_ACCESS_TOKEN, $token);
    //     } else {
    //         \Log::debug('トークン有効');
    //     }
    //     $videos = $this->fetch_service->fetch_my_videos($token);
    //     return response()->json(
    //         OpenAPIUtility::dicstionariesToModelContainers(OpenAPI\Model\YoutubeVideosPost200ResponseInner::class, $videos),
    //         Response::HTTP_OK
    //     );
    // }
}
