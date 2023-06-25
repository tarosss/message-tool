<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoriesProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
        app()->bind(\App\Interfaces\Repositories\UserRepositoryInterface::class, function () {
            return new \App\Repositories\UserRepository;
        });

        //
        app()->bind(\App\Interfaces\Repositories\MessageToolRepositoryInterface::class, function () {
            return new \App\Repositories\MessageToolRepository;
        });

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
