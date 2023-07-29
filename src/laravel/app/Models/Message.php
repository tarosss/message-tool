<?php

namespace App\Models;

use Moloquent;

class Message extends Moloquent
{
    protected $collection = 'messages';

    protected $fillable = [
        'message',
        'user_id',
        'storage',
        'sended',
        'channel_id',
    ];

    protected $dispatchesEvents = [
        // 'created' => \App\Events\CreateMessage::class
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\Member::class, 'user_id', 'user_id');
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
