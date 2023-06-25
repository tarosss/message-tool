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
    Route::group(['prefix' => 'member'], function () {
        Route::post('/store', '\App\Http\Controllers\Api\MemberController@create')->middleware(['abilities:collection:create']);
    });
    Route::post('/post', '\App\Http\Controllers\Api\@index');
});

Route::group(['prefix' => 'tokens'], function () {
    Route::post('/create', '\App\Http\Controllers\Api\TokenController@create');
});

