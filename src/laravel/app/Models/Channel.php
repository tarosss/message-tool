<?php

namespace App\Models;

use Moloquent;

class Channel extends Moloquent
{
    protected $collection = 'channels';
    
    protected $fillable = [
        'channel_type',
        'channel_name',
        'create_user',
        'users',
        'created_at',
        'updated_at',
    ];


    public function messages()
    {
        return $this->hasMany(\App\Models\Message::class, 'channel_id', 'channel_id');
    }
}
