<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// usecase
use App\UseCase\Comparison\RegisterComparisonAction;
use App\UseCase\Comparison\FindComparisonAction;
use App\UseCase\Comparison\ListComparisonAction;
use App\UseCase\Comparison\DeleteComparisonAction;
use App\UseCase\Comparison\PublishComparisonAction;
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
    public function find(int $id, FindComparisonAction $action): JsonResponse
    {
        $comparison = $action->find($id);
        if ($comparison) {
            return response()->json(
                OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\VideoComparison::class, $comparison->toArray()),
                Response::HTTP_OK
            );
        }
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }

    /**
     * 一覧取得
     *
     * @return JsonResponse
     */
    public function list(ListComparisonAction $action): JsonResponse
    {
        $comparisons = $action->list();
        if ($comparisons) {
            return response()->json(
                $comparisons,
                Response::HTTP_OK
            );
        }
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }

    /**
     * 登録
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function create(Request $request, RegisterComparisonAction $action): JsonResponse
    {
        $requestBody = new OpenAPI\Model\VideoComparison($request->all());
        $comparison = $action->register(
            $requestBody->getAnonymous() == 1 ? true : false,
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
                OpenAPIUtility::dicstionaryToModelContainer(OpenAPI\Model\ComparisonsPost200Response::class, ['comparisonId'=>$comparison->id]),
                Response::HTTP_CREATED
            );
        } else {
            return response()->json(
                [],
                Response::HTTP_OK
            );
        }
    }

    /**
     * 公開状態にする
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function publish(int $id, PublishComparisonAction $action): JsonResponse
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
    public function delete(int $id, DeleteComparisonAction $action): JsonResponse
    {
        $action->delete($id);
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }
}
