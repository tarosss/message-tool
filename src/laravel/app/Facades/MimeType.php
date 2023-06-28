<?php

namespace App\Facades;

class MimeType 
{
    public static function getExtentionFromMimeType(string $mimeType)
    {
        switch($mimeType) {
            case 'image/png':
            return 'png';
            case 'image/jpeg':
            return 'jpeg';
            case 'image/jpg':
            return 'jpg';
        }
    }
}