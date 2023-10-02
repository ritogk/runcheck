<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// Domain
use App\Domain\Comparison\RegisterComparisonAction;
use App\Domain\Comparison\FindComparisonAction;
use App\Domain\Comparison\ListComparisonAction;
use App\Domain\Comparison\DeleteComparisonAction;
use App\Domain\Comparison\PublishComparisonAction;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class CompoarionController extends Controller
{
    /**
     * 1件取得
     *
     * @param integer $id
     * @param FindComparisonAction $action
     * @return JsonResponse
     */
    public function find(int $id, FindComparisonAction $action): JsonResponse
    {
        $comparison = $action->find($id);
        return response()->json(
            [
                "category" => $comparison->category,
                "memo" => $comparison->memo,
                "title" => $comparison->title,
                "video1Url" => $comparison->video1_url,
                "video1TimeSt" => $comparison->video1_time_st,
                "video1VideoType" => $comparison->video1_type,
                "video2Url" => $comparison->video2_url,
                "video2TimeSt" => $comparison->video2_time_st,
                "video2VideoType" => $comparison->video2_type,
                "anonymous" => $comparison->anonymous
            ],
            Response::HTTP_OK
        );
    }

    /**
     * 一覧取得
     *
     * @param ListComparisonAction $action
     * @return JsonResponse
     */
    public function list(ListComparisonAction $action): JsonResponse
    {
        $comparisons = $action->list();
        $data = [];
        foreach ($comparisons as $comparison) {
            $data[] = [
                "id" => $comparison->id,
                "category" => $comparison->category,
                "memo" => $comparison->memo,
                "title" => $comparison->title,
                "video1Url" => $comparison->video1_url,
                "video1TimeSt" => $comparison->video1_time_st,
                "video1VideoType" => $comparison->video1_type,
                "video2Url" => $comparison->video2_url,
                "video2TimeSt" => $comparison->video2_time_st,
                "video2VideoType" => $comparison->video2_type,
                "anonymous" => $comparison->anonymous
            ];
        }
        return response()->json(
            $data,
            Response::HTTP_OK
        );
    }

    /**
     * 登録
     *
     * @param Request $request
     * @param RegisterComparisonAction $action
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

        return response()->json(
            ['comparisonId' => $comparison->id],
            Response::HTTP_CREATED
        );
    }

    /**
     * 公開状態にする
     *
     * @param integer $id
     * @param PublishComparisonAction $action
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
     * @param integer $id
     * @param DeleteComparisonAction $action
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
