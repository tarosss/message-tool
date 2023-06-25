<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\Repositories\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
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
}