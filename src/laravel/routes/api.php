<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth:sanctum'])->group(function () {
    Route::group(['prefix' => 'store', 'middleware' => ['abilities:collection:store']], function () {
        Route::post('/member', '\App\Http\Controllers\Api\MemberController@store');
        Route::post('/message', '\App\Http\Controllers\Api\MessageController@store');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@store');

    });
    Route::post('/post', '\App\Http\Controllers\Api\@index');
});

Route::group(['prefix' => 'tokens'], function () {
    Route::post('/create', '\App\Http\Controllers\Api\TokenController@create');
});


Route::group(['prefix' => 'user'], function () {
    Route::post('/store', '\App\Http\Controllers\Api\UserController@store');
});