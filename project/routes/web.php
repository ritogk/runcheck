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

//Route::get('/', function () {
//    return view('/top');
//});

Auth::routes();

// トップ
Route::get('/', 'TopController@index');
Route::get('/top', 'TopController@index')->name('top');
Route::match(['get', 'post'], '/top_store', 'TopController@store')->name('top.store');
Route::get('/top_destroy/{id}', 'TopController@destroy')->name('top.destroy');
Route::get('/top_tweat/{id}', 'TopController@tweat')->name('top.tweat');
Route::get('/top_read/{id}', 'TopController@read')->name('top.read');
Route::get('/on_data_get/{id}', 'TopController@on_data_get')->name('top.on_data_get');

// LocalLocal
Route::get('/locallocal', 'LocalLocalController@index')->name('locallocal');
Route::match(['get', 'post'], '/local_store', 'LocalLocalController@store')->name('locallocal.store');
Route::get('/locallocal_destroy/{id}', 'LocalLocalController@destroy')->name('locallocal.destroy');
Route::get('/locallocal_read/{id}', 'LocalLocalController@read')->name('locallocal.read');
Route::get('/on_data_get/{id}', 'LocalLocalController@on_data_get')->name('locallocal.on_data_get');

// youlocal
Route::get('/youlocal', 'YouLocalController@index')->name('youlocal');
Route::match(['get', 'post'], '/youlocal_store', 'YouLocalController@store')->name('youlocal.store');
Route::get('/youlocal_destroy/{id}', 'YouLocalController@destroy')->name('youlocal.destroy');
Route::get('/youlocal_read/{id}', 'YouLocalController@read')->name('youlocal.read');
Route::get('/on_data_get/{id}', 'YouLocalController@on_data_get')->name('youlocal.on_data_get');

// ajax
Route::get('/ajax/select2_comparison/{id}', 'Ajax\Select2Controller@select2_comparison')->name('ajax.select2.comparison');
Route::get('/analysis/set/', 'Ajax\AnalysisController@set');
Route::get('/analysis/reload/', 'Ajax\AnalysisController@reload');
Route::get('/analysis/read/', 'Ajax\AnalysisController@read');
Route::get('/analysis/save/', 'Ajax\AnalysisController@save');
Route::get('/analysis/play/', 'Ajax\AnalysisController@play');
Route::get('/analysis/stop/', 'Ajax\AnalysisController@stop');
Route::get('/analysis/slow/', 'Ajax\AnalysisController@slow');
Route::get('/analysis/fast/', 'Ajax\AnalysisController@fast');
Route::get('/analysis/multiRelease/', 'Ajax\AnalysisController@multiRelease');
Route::get('/analysis/tweat/', 'Ajax\AnalysisController@tweat');
Route::get('/analysis/delete/', 'Ajax\AnalysisController@delete');
Route::get('/analysis/access_youyou/', 'Ajax\AnalysisController@access_youyou');
Route::get('/analysis/access_locallocal/', 'Ajax\AnalysisController@access_locallocal');
Route::get('/analysis/access_youlocal/', 'Ajax\AnalysisController@access_youlocal');

// ホーム
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/home_tweat/{id}', 'HomeController@tweat')->name('home.tweat');
Route::get('/home_destroy/{id}', 'HomeController@destroy')->name('home.destroy');
Route::get('/home_release_update/{id}', 'HomeController@release_update')->name('home.release_update');

// お問い合わせ
Route::get('contact', 'ContactsController@index')->name('contact');
Route::post('contact/send', 'ContactsController@send')->name('contact.send');
