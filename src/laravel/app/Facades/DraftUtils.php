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

    public static function getDraftKey(string $channelId, ?string $threadMessageId)
    {
        if ($threadMessageId) {
            return $channelId . '-'. $threadMessageId;
        }

        return $channelId;
    }

    public function update(array $data) 
    {

    }
}