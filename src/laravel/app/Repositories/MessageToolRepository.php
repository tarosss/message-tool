<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\Member;
use App\Models\File;
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

    public function createMembers($data)
    {
        Member::insert($data);
    }

    public function createMessage($data)
    {
        $message = Message::create($data);
        return $message;
    }

    public function createMessages($data)
    {
        Message::insert($data);
    }

    public function createFile($data)
    {
        $file = File::create($data);
        return $file;
    }

    public function createFiles($data)
    {
        File::insert($data);
    }
}