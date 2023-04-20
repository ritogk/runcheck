<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// service
use App\Services\ComparisonService;
use App\Services\AuthenticationService;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class CompoarionController extends Controller
{
    private ComparisonService $comparison_service;
    private AuthenticationService $authentication_service;
    public function __construct()
    {
        $this->comparison_service = new ComparisonService();
        $this->authentication_service = new AuthenticationService();
    }
    /**
     * 1件取得
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function find(int $id): JsonResponse
    {
        $comparison = $this->comparison_service->find($id);
        // 公開されている または 自身の情報のみ返す。
        if ((!$comparison->release_kbn && $comparison->user_id == $this->authentication_service->me()->id) || $comparison->release_kbn) {
            return response()->json(
                OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\VideoComparison::class, $comparison->toArray()),
                Response::HTTP_CREATED
            );
        }
        return response()->json(
            [],
            Response::HTTP_NO_CONTENT
        );
    }

    /**
     * 登録
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $requestBody = new OpenAPI\Model\VideoComparison($request->all());

        $comparison_service = new ComparisonService();
        $authentication_service = new AuthenticationService();
        $me = $authentication_service->me();
        $comparison = $comparison_service->create(
            $me ? $me->id : null,
            $requestBody->getCategory() ?? '',
            $requestBody->getTitle(),
            $requestBody->getMemo(),
            $requestBody->getVideo1TimeSt(),
            $requestBody->getVideo1Url(),
            (int)$requestBody->getVideo1VideoType(),
            $requestBody->getVideo2TimeSt(),
            $requestBody->getVideo2Url(),
            (int)$requestBody->getVideo2VideoType(),
        );

        if ($comparison) {
            return response()->json(
                OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\VideoComparison::class, $comparison->toArray()),
                Response::HTTP_CREATED
            );
        } else {
            return response()->json(
                [],
                Response::HTTP_NO_CONTENT
            );
        }
    }
}
