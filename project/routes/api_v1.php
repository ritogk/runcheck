<?php

use Illuminate\Http\Request;
use App\Http\Controllers;

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
    Route::get('/', [Controllers\YouLocalController::class, 'index']);
});

Route::group(['prefix' => 'authentication'], function () {
    Route::post('/login', [Controllers\YouLocalController::class, 'index']);
    Route::post('/logout', [Controllers\YouLocalController::class, 'index']);
    Route::get('/me', [Controllers\YouLocalController::class, 'index']);
    Route::get('/mea', [Controllers\YouLocalController::class, 'index']);
});

Route::group(['prefix' => 'comparisons'], function () {
    Route::get('/{id}', [Controllers\YouLocalController::class, 'index']);
    Route::post('/', [Controllers\YouLocalController::class, 'index']);
    Route::post('/{id}/publish', [Controllers\YouLocalController::class, 'index']);
    Route::delete('/', [Controllers\YouLocalController::class, 'index']);
});

Route::group(['prefix' => 'youtube'], function () {
    Route::get('/oauth/url', [Controllers\YouLocalController::class, 'index']);
    Route::post('/oauth', [Controllers\YouLocalController::class, 'index']);
    Route::get('/videos', [Controllers\YouLocalController::class, 'index']);
});

Route::post('/operationLog', [Controllers\YouLocalController::class, 'index']);