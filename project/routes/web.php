<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes();

Route::get('/', function () {
  return redirect('/app/index');
})->name('app');

// spaのルーティング
Route::get('/app/{any}', function () {
  return view('app');
})->where('any', '.*');

// lp
Route::get('/lp/ja', 'LPController@show_ja')->name('lp.ja');
Route::get('/lp/en', 'LPController@show_en')->name('lp.en');

// 旧urlのリダイレクト
Route::get('/youyou', function () {
  return redirect('/');
});

Route::get('/privacy', function () {
  return view('privacy');
})->name('privacy');

Route::get('/terms', function () {
  return view('terms');
})->name('terms');

Route::get('/location', function () {
  return view('location');
})->name('location');
