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
    // Route::get('/{id}', [Controllers\YouLocalController::class, 'index']);
    Route::post('/', [V1\CompoarionController::class, 'create']);
    // Route::post('/{id}/publish', [Controllers\YouLocalController::class, 'index']);
    // Route::delete('/', [Controllers\YouLocalController::class, 'index']);
});

// Route::group(['prefix' => 'youtube'], function () {
//     Route::get('/oauth/url', [Controllers\YouLocalController::class, 'index']);
//     Route::post('/oauth', [Controllers\YouLocalController::class, 'index']);
//     Route::get('/videos', [Controllers\YouLocalController::class, 'index']);
// });

// Route::post('/operationLog', [Controllers\YouLocalController::class, 'index']);
