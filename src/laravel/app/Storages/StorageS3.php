<?php

namespace App\Storages;

use \App\Interfaces\Storages\StorageInterface;

class StorageS3 implements StorageInterface
{
    public function getStorage(): string
    {
        return 's3';
    }
}
