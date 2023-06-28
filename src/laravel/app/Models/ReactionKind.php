<?php

namespace App\Models;

use Moloquent;

class ReactionKind extends Moloquent
{
    protected $collection = 'reaction_kinds';

    protected $fillable = [
        'reaction_kind_name',
        'created_at',
        'updated_at',
    ];
}
