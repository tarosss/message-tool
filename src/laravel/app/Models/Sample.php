<?php
namespace App\Models;

use Moloquent;

class Sample extends Moloquent
{
    protected $collection = 'sample';

    protected $fillable = [
        'sample_id',
        'sample_name',
        'sample_name2'
    ];

    // public function items()
    // {
    //     return $this->hasMany(\App\Models\Item::class, 'sample_id', 'sample_id');
    // }

    // public function items()
    // {
    //     return $this->belongsToMany(\App\Models\Item::class, null, 'sample_ids', 'item_ids');
    // }

    public function items()
    {
        return $this->embedsMany(\App\Models\Item::class, 'sample_id');
    }
}