<?php

namespace App\Facades;
use Log;
class DraftUtils
{
    public static function getUpsertKey(&$array): array
    {
        if (isset($array['_id'])) {
            return ['_id' => $array['_id'], ];
        }

        if (isset($array['thread_message_id'])) {
            return ['channel_id' => $array['channel_id'], 'thread_message_id' => $array['thread_message_id'], 'user_id' => $array['user_id']];
            return ['draft_key' => $array['channel_id'] . '-' . $array['thread_message_id'], 'user_id' => $array['user_id']];
        }

        return ['channel_id' => $array['channel_id'], 'thread_message_id' => null, 'user_id' => $array['user_id']];
        return ['draft_key' => $array['channel_id']];
    }

    public static function getDraftKey(string $userId, string $channelId, ?string $threadMessageId)
    {
        if ($threadMessageId) {
            return $userId . '-' . $channelId . '-'. $threadMessageId;
        }

        return $userId . '-' . $channelId;
    }

    public function update(array $data) 
    {

    }

    public static function unsetFile(array $data)
    {
        unset($data['files']);
        return $data;
    }
}