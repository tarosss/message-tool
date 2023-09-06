<?php

namespace App\Http\Controllers\Api;

use App\Facades\Date;
use Illuminate\Http\Request;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use Illuminate\Http\Response;

use Log;
class ChannelController extends \App\Http\Controllers\Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        Log::info($request);
        try {
            $channel = $messageToolRepository->createChannel([
                'channel_type' => $request->input('channel_type'),
                'channel_name' => $request->input('channel_name'),
                'create_user' => $request->input('create_user'),
                'users' => $request->has('users') ? $request->input('users') : [],
                'created_at' => Date::getNowString(),
            ]);

            return response()->json([
                'error' => false,
                'channel' => $channel,
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        try {
            $channels = $messageToolRepository->getChannels([]);

            $channels = array_column($channels, null, '_id');
            return response()->json([
                'error' => false,
                'channels' => $channels
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        //
    }

}
