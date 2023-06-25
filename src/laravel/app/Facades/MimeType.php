<?php

namespace App\Facades;

class MimeType 
{
    public static function getExtentionFromMimeType(string $mimeType)
    {
        switch($mimeType) {
            case 'image/png':
            return 'png';
        }
    }
}