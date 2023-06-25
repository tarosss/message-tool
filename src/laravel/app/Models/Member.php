<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use Moloquent;

class Member extends Moloquent
{
    use HasApiTokens;

    protected $collection = 'members';
}
