<?php

namespace App\Factories;

use Exception;
use Log;
class StorageFactory 
{
    public static function getStorage($storage = 'local'): \App\Interfaces\Storages\StorageInterface
    {
        switch($storage) {
            case 'local':
                return new \App\Storages\StorageLocal;
            case 's3':
                return new \App\Storages\StorageS3;
            default:
                throw new Exception();
        }
    }
}