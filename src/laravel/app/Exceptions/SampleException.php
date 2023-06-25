<?php

namespace App\Exceptions;

use Exception;

class SampleException extends Exception
{
    private $user;

    public function setUser($user) {
        $this->user = $user;
    }

    public function context()
    {
        return [
            'cla' => 1,
            'cnjk' => 111
        ];
    }
}
