<?php

namespace App\Models;

use Moloquent;

class Message extends Moloquent
{
    protected $collection = 'messages';

    protected $fillable = [
        'message',
        'member_id',
        'storage',
    ];

    public function member()
    {
        return $this->belongsTo(\App\Models\Member::class, 'member_id', 'member_id');
    }

    public function channel()
    {
        return $this->belongsTo(\App\Models\Channel::class, 'channel_id', 'channel_id');
    }

    public function files()
    {
        return $this->hasMany(\App\Models\File::class, '_ids', 'message_id');
    }
}
