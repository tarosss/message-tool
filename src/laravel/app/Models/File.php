<?php

namespace App\Models;

use Moloquent;

class File extends Moloquent
{
    protected $collection = 'files';

    public function message()
    {
        return $this->belongsTo(\App\Models\Message::class, 'message_id', '_id');
    }
}
