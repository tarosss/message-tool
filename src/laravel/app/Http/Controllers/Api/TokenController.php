<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;
use App\Facades\Sanctum;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Exceptions\UserNotFoundException;

use Log;

class TokenController extends \App\Http\Controllers\Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, UserRepositoryInterface $userRepository)
    {
        try {

            $user = $userRepository->getDataById($request->input("user_id"), false);
            if ($user === null) {
                throw (new UserNotFoundException(
                    'Not found user', 
                    Response::HTTP_NOT_FOUND
                ));
            }

            $token = $user->createToken(
                Sanctum::getTokenName(),  
                Sanctum::getTokenAbilities()
            );

            return response()->json([
                'token' => $token->plainTextToken
            ], Response::HTTP_CREATED);
        } catch (UserNotFoundException $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], $e->getCode());
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()()
            ], $e->getCode());
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
