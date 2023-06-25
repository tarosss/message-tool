<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Facades\StringUtils;
use Log;

class MemberController extends \App\Http\Controllers\Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        Log::info('response is ' . $request);
        var_dump("ckjannmksac");

        return response()->json([
            'key' => 'value'
        ], 400);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $user = $request->user();
        $messageToolRepository->storeMemBers([
            'member_id' => StringUtils::getRandomString(20)
        ]);

        try {
            return response()->json([
                'error' => false
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        //
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
