<?php

namespace App\Facades;
use Carbon\Carbon;

class Date 
{
    public static function getNowString(): string
    {
        return Carbon::now()->__toString();
    }
}