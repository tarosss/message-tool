<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\Member;
use App\Models\Channel;
use App\Models\Reaction;
use App\Models\ReactionKind;

use App\Models\File;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use App\Models\Draft;
use Exception;
use Illuminate\Support\Facades\Log as FacadesLog;
use Log;
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

    public function getMessage(array $wheres)
    {
        $data = Message::select('*');
        if (isset($wheres['_id'])) {
            $data->where('_id', $wheres['_id']);
        }

        return $data->first();
    }

    public function getMessages(array $wheres)
    {
        $data = Message::select('*');

        if (isset($wheres['user_id'])) {
            $data->where('user_id', $wheres['user_id']);
        }

        $data->orderBy('created_at');
        return $data->count() ? $data->get()->toArray() : [];
    }

    public function createMessage($data): Message
    {
        return Message::create($data);
    }

    public function createMessages($data): void
    {
        Message::insert($data);
    }

    public function updateMessage(array $wheres, array $data)
    {
        unset($data['_id']);
        return Message::where($wheres)
            ->update($data);
    }

    // カラムを指定してデータを追加する
    public function pushMessage(string $id, string $column, $data)
    {
        return Message::where('_id', $id)
            ->push($column, $data);
    }

    public function getDraft(array $wheres)
    {
        return Draft::where($wheres)
             ->first();
    }

    public function getDrafts(array $wheres)
    {
        $data = Draft::select('*');
        if (isset($wheres['user_id'])) {
            $data->userId($wheres['user_id']);
        }

        return $data->count() ? $data->get()->toArray() : [];
    }
    
    public function pushDraft(array $wheres, string $column, array $fileData)
    {
        Draft::where($wheres)
            ->push($column, $fileData);
    }

    public function upsertDrafts(array $data, array $wheres)
    {
        unset($data['_id']);
        Draft::where($wheres)
            ->update($data, ['upsert' => true]);
    }

    /**
     * ファイルの追加,削除が行われた時の処理
     */
    public function updateDraftFile(array $wheres, array $files)
    {
        Draft::where($wheres)
            ->update(['files' => $files]);
    }

    public function deleteDraft(array $wheres)
    {
        Draft::where($wheres)
            ->delete();
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

    public function getChannels($wheres): array
    {
        $channels = Channel::where($wheres);
        
        if ($channels->count() <= 0) {
            throw new Exception();
        }

        return $channels->get()->toArray();
    }

    public function updateChannel(array $wheres, array $data)
    {
        unset($data['_id']);
        Channel::where($wheres)
            ->update($data);
    }

    public function createReaction($data): Reaction
    {
        return Reaction::create($data);
    }

    public function createReactions($data): void
    {
        Reaction::insert($data);
    }

    public function getReactions(array $wheres = [])
    {
        $data = Reaction::select('*');

        return $data->count() ? $data->get()->toArray() : [];
    }

    public function createReactionKind($data): ReactionKind
    {
        return ReactionKind::create($data);
    }

    public function createReactionKinds($data): void
    {
        ReactionKind::insert($data);
    }

    public function getFiles(array $wheres = [])
    {
        $data = File::select('*');
        if (isset($wheres['user_id'])) {
            $data->where('user_id', $wheres['user_id']);
        }

        $data->orderBy('created_at');
        return $data->count() ? $data->get()->toArray() : [];
    }
}