<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use \App\Interfaces\Repositories\MessageToolRepositoryInterface;
use \App\Interfaces\Repositories\UserRepositoryInterface;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class UserController extends \App\Http\Controllers\Controller
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
    public function store(Request $request, UserRepositoryInterface $userRepository)
    {
        try {
            $userRepository->createUser([
                'user_id' => $request->input('user_id')
            ]);

            return response()->json([
                'error' => false
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, UserRepositoryInterface $userRepository)
    {
        try {
            $users = $userRepository->getUsers([]);
            return response()->json([
                'error' => false,
                'users' => array_column($users, null, '_id'),
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json([
                'error' => true
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
