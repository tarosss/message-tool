<?php

namespace App\Exceptions;

use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Log;
class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
        \App\Exceptions\SampleException::class
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        // $this->reportable(function (App\Exceptions\SampleException $e) {
        //     Log::info("mcvakmfnjkdnvkancjks");
        // });

        $this->reportable(function (\App\Exceptions\SampleException $e) {
            
        });

        $this->renderable(function (\App\Exceptions\SampleException $e) {
            return response()->json([
                'error' => true,
                'message' => '汚い犬'
            ], 300);
        });

        $this->reportable(function (Throwable $e) {
            //
            return true;
        });
    }
}
