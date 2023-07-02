<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use Log;
class MessageToolController extends Controller
{
    public function index(MessageToolRepositoryInterface $messageToolRepository)
    {
        // $data = $messageToolRepository->getAllMessages();
        // Log::info($data);
        return view("sample");
    }
}
