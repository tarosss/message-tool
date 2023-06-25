<?php

namespace App\Facades;
use \Carbon\Carbon;

class Date 
{
    public static function getNow(): string
    {
        return Carbon::now()->__toString();
    }
}