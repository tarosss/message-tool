<?php

namespace App\Models;

use Moloquent;

class Channel extends Moloquent
{
    protected $collection = 'channel';
    
    public function messages()
    {
        return $this->hasMany(\App\Models\Message::class, 'channel_id', 'channel_id');
    }
}
