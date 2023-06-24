<?php
namespace App\Models;

use Moloquent;

class Item extends Moloquent
{
    protected $collection = 'item';

    protected $fillable = [
        'item_id',
        'item_name',
    ];

    // public function sample()
    // {
    //     return $this->belongsTo(\App\Models\Sample::class, 'sample_id', 'sample_id');
    // }

    // public function samples()
    // {
    //     return $this->belongsToMany(\App\Models\Sample::class, null, 'item_ids', 'sample_ids');
    // }
}