<?php

namespace App\Models;

use Moloquent;

class Draft extends Moloquent
{
    protected $collection = 'drafts';

    protected $fillable = [
        'draft_key',
        'message',
        'storage',
        'user_id',
        'channel_id',
        'reactions',
        'thread',
        'isThread',
        'thread_message_id',
        'files',
        'created_at',
        'updated_at',
    ];

    public function scopeUserId($query, string $userId)
    {
        $query->where('user_id', $userId);
    }
}
