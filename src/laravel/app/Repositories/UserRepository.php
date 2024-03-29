<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\Repositories\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function getAllData()
    {
        
    }

    public function getUsers(array $wheres = [])
    {
        $data = User::select('*');

        return $data->count() ? $data->get()->toArray() : [];
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

    public function createUser(array $data): void
    {
        User::insert($data);
    }
}