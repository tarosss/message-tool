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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::group(['prefix' => 'store', 'middleware' => ['abilities:collection:store']], function () {
        Route::post('/user', '\App\Http\Controllers\Api\MemberController@store');
        Route::post('/message', '\App\Http\Controllers\Api\MessageController@store');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@store');
        Route::post('/reaction', '\App\Http\Controllers\Api\ReactionController@store');
        Route::post('/reaction-kind', '\App\Http\Controllers\Api\ReactionKindController@store');
    });

    Route::group(['prefix' => 'show', 'middleware' => ['abilities:collection:show']], function () {
        Route::post('/user', '\App\Http\Controllers\Api\MemberController@store');
        Route::post('/message', '\App\Http\Controllers\Api\MessageController@show');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@show');
        Route::post('/reaction', '\App\Http\Controllers\Api\ReactionController@store');
        Route::post('/reaction-kind', '\App\Http\Controllers\Api\ReactionKindController@store');
    });
    
    Route::post('/post', '\App\Http\Controllers\Api\@index');
});

// 一時的
Route::post('/user', '\App\Http\Controllers\Api\UserController@show');
Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@show');
Route::post('/message', '\App\Http\Controllers\Api\MessageController@show');

Route::group(['prefix' => 'tokens'], function () {
    Route::post('/create', '\App\Http\Controllers\Api\TokenController@create');
});


Route::group(['prefix' => 'first-user'], function () {
    Route::post('/store', '\App\Http\Controllers\Api\UserController@store');
});