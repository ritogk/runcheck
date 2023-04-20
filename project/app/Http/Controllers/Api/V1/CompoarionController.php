<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// usecase
use App\UseCase\Comparison\RegisterComparisonUseCase;
use App\UseCase\Comparison\FindComparisonUseCase;
use App\UseCase\Comparison\DeleteComparisonUseCase;
use App\UseCase\Comparison\PublishComparisonUseCase;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class CompoarionController extends Controller
{
    /**
     * 1件取得
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function find(int $id, FindComparisonUseCase $action): JsonResponse
    {
        $comparison = $action->find($id);
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
    public function publish(int $id, PublishComparisonUseCase $action): JsonResponse
    {
        $action->publish($id);
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
    public function delete(int $id, DeleteComparisonUseCase $action): JsonResponse
    {
        $action->delete($id);
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }
}
