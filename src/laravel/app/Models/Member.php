<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use Moloquent;

class Member extends Moloquent
{
    use HasApiTokens;

    protected $collection = 'members';

    protected $fillable = [
        'member_id',
        'member_name',
        'member_name_yomi',
        'display_member_name',
        'email',
        'tel',
        'status',
        'time_zone',
        'invested',
        'recently_used_icons',
    ];

    public function scopeMemberId($query)
    {

    }

    public function messages()
    {
        return $this->hasMany(\App\Models\Message::class, 'member_id', 'member_id');
    }

    public function recentlyUsedIcons()
    {
        return $this->belongsTo(\App\Models\Reactions::class);
    }
}
