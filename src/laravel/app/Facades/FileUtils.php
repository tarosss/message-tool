<?php

namespace App\Facades;
use App\Interfaces\Storages\StorageInterface;
use Log;
class FileUtils
{
    public static function putFile(StorageInterface &$storage, string $path, $file, $public = true)
    {
        $fileName = (function () use ($file) {
            $fileName = \App\Facades\StringUtils::getRandomString(30);
            $extention = MimeType::getExtentionFromMimeType($file->getMimeType());
            return $fileName . '.' . $extention;
        })();
        Log::info($fileName);

        // ファイルを保存する
        $storage->putFileAs($path, $file, $fileName);
        
        return $fileName;
    }

    
}