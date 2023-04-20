<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'users'], function () {
    Route::post('/', [V1\UserController::class, 'create']);
});

Route::group(['prefix' => 'authentication'], function () {
    Route::post('/login', [V1\AuthenticationController::class, 'login']);
    Route::post('/logout', [V1\AuthenticationController::class, 'logout'])->middleware(['auth']);
    Route::get('/me', [V1\AuthenticationController::class, 'me'])->middleware(['auth']);
});

Route::group(['prefix' => 'comparisons'], function () {
    Route::get('/{id}', [V1\CompoarionController::class, 'find']);
    Route::post('/', [V1\CompoarionController::class, 'create']);
    Route::put('/{id}/publish', [V1\CompoarionController::class, 'publish']);
    Route::delete('/{id}', [V1\CompoarionController::class, 'delete']);
});

Route::group(['prefix' => 'youtube'], function () {
    Route::get('/oauth/authorize', [V1\YouTubeController::class, 'authorize_url']);
    Route::post('/oauth/access_token', [V1\YouTubeController::class, 'access_token']);
    Route::get('/videos', [V1\YouTubeController::class, 'videos']);
});

// Route::post('/operationLog', [Controllers\YouLocalController::class, 'index']);
