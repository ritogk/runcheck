<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// service
use App\Services\OperationLogService;
// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

class OperationLogController extends Controller
{
    /**
     * 登録
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $requestBody = new OpenAPI\Model\RequestOperationLog($request->all());
        $operation_log_service = new OperationLogService();
        $operation_log_service->update_log(
            (int)$requestBody->getOperationCd()
        );
        return response()->json(
            [],
            Response::HTTP_CREATED
        );
    }
}
