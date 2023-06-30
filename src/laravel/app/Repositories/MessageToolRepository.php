<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\Member;
use App\Models\Channel;
use App\Models\Reaction;
use App\Models\ReactionKind;

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

    public function getAllMessages()
    {
        return Message::all()
            ->toArray();
    }

    public function createMember($data)
    {
        return Member::create($data);
    }

    public function createMembers($data)
    {
        Member::insert($data);
    }

    public function createMessage($data): Message
    {
        return Message::create($data);
    }

    public function createMessages($data): void
    {
        Message::insert($data);
    }

    public function createFile($data): File
    {
        return File::create($data);
    }

    public function createFiles($data): void
    {
        File::insert($data);
    }

    public function createChannel($data): Channel
    {
        return Channel::create($data);
    }

    public function createChannels($data): void
    {
        Channel::insert($data);
    }

    public function createReaction($data): Reaction
    {
        return Reaction::create($data);
    }

    public function createReactions($data): void
    {
        Reaction::insert($data);
    }

    public function createReactionKind($data): ReactionKind
    {
        return ReactionKind::create($data);
    }

    public function createReactionKinds($data): void
    {
        ReactionKind::insert($data);
    }
}