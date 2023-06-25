<?php

namespace App\Facades;

use Illuminate\Support\ServiceProvider;

class Sanctum 
{
    public static function getTokenName()
    {
        return 'MyKey';
    }

    public static function getTokenAbilities()
    {
        return [
            'collection:create',
            'collection:store',
            'collection:edit',
            'collection:update',
            'collection:destroy',

        ];
    }
}