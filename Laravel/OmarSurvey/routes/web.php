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

Route::get('/', 'HomeController@index');

Route::prefix('home')->group(function () {
    Route::get('/', 'HomeController@index');
    Route::post('ajax/{type}', 'HomeController@ajax')->name('type');
});

Route::prefix('take')->group(function () {
    Route::get('/{hash}', 'TakeController@index')->name('hash');
    Route::post('ajax/{type}', 'TakeController@ajax')->name('type');
});

Route::prefix('finish')->group(function () {
    Route::get('/{hash}', 'FinishController@index')->name('hash');
    Route::get('pdf/{hash}', 'FinishController@pdf')->name('hash');
    Route::get('excel/{hash}', 'FinishController@excel')->name('hash');
});

Route::prefix('dashboard')->group(function () {
    Route::get('/', 'DashboardController@index')->middleware('auth');;
    Route::post('ajax/{type}', 'DashboardController@ajax')->name('type');
});

Route::prefix('category')->group(function () {
    Route::get('/', 'CategoryController@index')->middleware('auth');
    Route::post('ajax/{type}', 'CategoryController@ajax')->name('type');
});

Route::prefix('point')->group(function () {
    Route::get('/', 'PointController@index')->middleware('auth');
    Route::post('ajax/{type}', 'PointController@ajax')->name('type');
});

Route::prefix('survey')->group(function () {
    Route::get('/', 'SurveyController@index')->middleware('auth');
    Route::post('ajax/{type}', 'SurveyController@ajax')->name('type');
});

Route::prefix('result')->group(function () {
    Route::get('/', 'ResultController@index')->middleware('auth');
    Route::post('ajax/{type}', 'ResultController@ajax')->name('type');
    Route::get('detail/{id}', 'ResultController@detail')->middleware('auth');
    Route::get('pdf/{id}', 'ResultController@pdf')->name('id');
    Route::get('excel/{id}', 'ResultController@excel')->name('id');
    Route::get('excelSurveyor', 'ResultController@excelSurveyor');
});

Auth::routes(['register' => false]);


