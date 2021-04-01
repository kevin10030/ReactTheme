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

Route::get('/', 'IndexController@index');

Route::prefix('index')->group(function () {
    Route::get('/', 'IndexController@index');
    Route::post('/ajax/{type}', 'IndexController@ajax')->name('type');
});

Route::prefix('ebook')->group(function () {
    Route::prefix('download')->group(function () {
        Route::get('/', 'EBookDownloadController@index');
        Route::post('/ajax/{type}', 'EBookDownloadController@ajax')->name('type');
    });
    
    Route::prefix('thank')->group(function () {
        Route::get('/', 'EBookThankController@index');
        Route::post('/ajax/{type}', 'EBookThankController@ajax')->name('type');
    });
});

Route::prefix('strategic')->group(function () {
    Route::prefix('request')->group(function () {
        Route::get('/', 'StrategicRequestController@index');
        Route::post('/ajax/{type}', 'StrategicRequestController@ajax')->name('type');
    });
    
    Route::prefix('thank')->group(function () {
        Route::get('/', 'StrategicThankController@index');
        Route::post('/ajax/{type}', 'StrategicThankController@ajax')->name('type');
    });
});