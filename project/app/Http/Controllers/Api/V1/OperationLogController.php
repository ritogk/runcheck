<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
// usecase
use App\UseCase\OperationLog\UpdateOperationLogAction;
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
    public function create(Request $request, UpdateOperationLogAction $action): JsonResponse
    {
        $requestBody = new OpenAPI\Model\RequestOperationLog($request->all());
        $action->update((int)$requestBody->getOperationCd());
        return response()->json(
            [],
            Response::HTTP_CREATED
        );
    }
}
