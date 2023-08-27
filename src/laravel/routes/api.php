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
        Route::post('/message2', '\App\Http\Controllers\Api\MessageController@store2');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@store');
        Route::post('/reaction', '\App\Http\Controllers\Api\ReactionController@store');
    });

    Route::group(['prefix' => 'show', 'middleware' => ['abilities:collection:show']], function () {
        Route::post('/user', '\App\Http\Controllers\Api\MemberController@store');
        Route::post('/message', '\App\Http\Controllers\Api\MessageController@show');
        Route::post('/draft', '\App\Http\Controllers\Api\DraftController@show');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@show');
        Route::post('/reaction', '\App\Http\Controllers\Api\ReactionController@show');
        Route::post('/reaction-kind', '\App\Http\Controllers\Api\ReactionKindController@show');
    });
    
    Route::group(['prefix' => 'update', 'middleware' => ['abilities:collection:update']], function () {
        Route::post('/user', '\App\Http\Controllers\Api\MemberController@update');
        Route::post('/message', '\App\Http\Controllers\Api\MessageController@update');
        Route::post('/draft', '\App\Http\Controllers\Api\DraftController@update');
        Route::post('/draft/file', '\App\Http\Controllers\Api\DraftController@updateFile');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@update');
        Route::post('/reaction', '\App\Http\Controllers\Api\ReactionController@update');
        Route::post('/reaction-kind', '\App\Http\Controllers\Api\ReactionKindController@update');
    });

    Route::group(['prefix' => 'delete', 'middleware' => ['abilities:collection:destroy']], function () {
        Route::post('/user', '\App\Http\Controllers\Api\MemberController@destroy');
        Route::post('/message', '\App\Http\Controllers\Api\MessageController@destroy');
        Route::post('/draft', '\App\Http\Controllers\Api\DraftController@destroy');
        Route::post('/draft/file', '\App\Http\Controllers\Api\DraftController@destroyFile');
        Route::post('/channel', '\App\Http\Controllers\Api\ChannelController@destroy');
        Route::post('/reaction', '\App\Http\Controllers\Api\ReactionController@destroy');
        Route::post('/reaction-kind', '\App\Http\Controllers\Api\ReactionKindController@destroy');
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