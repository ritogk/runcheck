<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// service
use App\Services\ComparisonService;
use App\Services\AuthenticationService;
// usecase
use App\UseCase\Comparison\RegisterComparisonUseCase;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class CompoarionController extends Controller
{
    private ComparisonService $comparison_service;
    public function __construct()
    {
        $this->comparison_service = new ComparisonService();
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
        if ($comparison) {
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
    public function create(Request $request, RegisterComparisonUseCase $action): JsonResponse
    {
        $requestBody = new OpenAPI\Model\VideoComparison($request->all());
        $comparison = $action->register(
            $requestBody->getCategory() ?? '',
            $requestBody->getTitle(),
            $requestBody->getMemo(),
            $requestBody->getVideo1TimeSt(),
            $requestBody->getVideo1Url(),
            (int)$requestBody->getVideo1VideoType(),
            $requestBody->getVideo2TimeSt(),
            $requestBody->getVideo2Url(),
            (int)$requestBody->getVideo2VideoType()
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

    /**
     * 公開状態にする
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function publish(int $id): JsonResponse
    {
        $this->comparison_service->publish($id);
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }

    /**
     * 削除
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        $this->comparison_service->delete($id);
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }
}
