<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use Log;
class MessageToolController extends Controller
{
    public function index(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        // $data = $messageToolRepository->getAllMessages();
        // Log::info($data);
        
        $userId = session()->get('user_id');
        return view("sample", compact('userId'));
    }
}
