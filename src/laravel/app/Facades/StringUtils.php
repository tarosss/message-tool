<?php

namespace App\Facades;

use Illuminate\Support\Str;

class StringUtils 
{
    public static function getRandomString(int $length)
    {
        return Str::random($length);
    }
}