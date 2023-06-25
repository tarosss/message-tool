<?php

namespace App\Factories;

class StorageFactory 
{
    public static function getStorage($storage = 'local'): \App\Interfaces\Storages\StorageInterface
    {
        switch($storage) {
            case 'local':
                return new \App\Storages\StorageLocal;
            case 's3':
                return new \App\Storages\StorageS3;
                
        }
    }
}