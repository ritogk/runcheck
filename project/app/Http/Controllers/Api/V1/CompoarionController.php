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
