<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Symfony\Component\VarDumper\VarDumper;

class SampleController extends Controller
{
    //

    public function index()
    {
        var_dump(Message::all()->toArray());
        return view('index');
    }
}
