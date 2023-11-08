<?php

namespace App\Models;

use Moloquent;

class File extends Moloquent
{
    protected $collection = 'files';

    protected $fillable = [
        'file_name',
        'original_file_name',
        'mime_type',
        'user_id',
        'channel_id',
        'message_id',
        'created_at',
        'updated_at',
    ];
    
    public function message()
    {
        return $this->belongsTo(\App\Models\Message::class, 'message_id', '_id');
    }
}
