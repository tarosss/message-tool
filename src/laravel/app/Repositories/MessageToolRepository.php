<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\Member;

use App\Interfaces\Repositories\MessageToolRepositoryInterface;

class MessageToolRepository implements MessageToolRepositoryInterface
{
    public function getAllData()
    {
        
    }

    public function getDataById($id, $toArray = true)
    {
        $user = User::userId($id)
            ->first();

        if ($user === null) {
            return null;
        }

        return $toArray ? $user->toArray() : $user;
    }

    public function storeMembers($data)
    {
        Member::insert($data);
    }
}