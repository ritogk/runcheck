<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Response;
use App\Exceptions\OAuthException;
use App\Exceptions\DataNotFoundException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof OAuthException) {
            return response()->json([
                'errMsg'   => 'OAuthでエラーが発生しました。'
            ], Response::HTTP_UNAUTHORIZED);
        }

        if ($exception instanceof DataNotFoundException) {
            return response()->json([
                'errMsg'   => 'データが存在しませんでした。'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($exception instanceof \Exception) {
            return response()->json(['error' => 'error'], 500);
        }
        return parent::render($request, $exception);
    }

    /**
     * Undocumented function
     *
     * @param [type] $request
     * @param AuthenticationException $exception
     * @return void
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return response()->json([
            'errMsg'   => '認証でエラーが発生しました。'
        ], Response::HTTP_UNAUTHORIZED);
    }
}
