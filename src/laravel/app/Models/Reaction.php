<?php

namespace App\Models;

use Moloquent;

class Reaction extends Moloquent
{
    protected $collection = 'reactions';
    protected $fillable = [
        'reaction_name',
        'reaction_kinds',
        'icon_path',
        'create_user',
        'bar',
        'created_at',
        'updated_at',
        
    ];
}
