<?php

namespace App\Factories;

use App\Consts\Message;

class MessageProcessFactory 
{
    public static function getProcess(int $messageType = Message::MESSAGE)
    {
        switch($messageType) {
            case Message::MESSAGE:
                return new \App\Storages\StorageLocal;
            case Message::DRAFT:
                return new \App\Storages\StorageS3;
        }
    }
}