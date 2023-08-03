<?php

namespace App\Storages;

use \App\Interfaces\Storages\StorageInterface;
use Storage;
class StorageLocal implements StorageInterface
{

    private $disk;
    public function __construct()
    {
        $this->disk = 'local';
    }
    public function getDisk(): string
    {
        return $this->disk;
    }

    public function putFileAs(string $path, $file, string $fileName, $public = true): void
    {
        if ($public) {
            $path = 'public/' . $path;
        }

        Storage::disk($this->disk)
            ->putFileAs($path, $file, $fileName);
    }
}