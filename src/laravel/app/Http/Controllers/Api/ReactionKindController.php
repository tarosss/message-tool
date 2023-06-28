<?php

namespace App\Http\Controllers\Api;

use App\Models\ReactionKind;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use App\Facades\Date;
use Exception;
use Log;
class ReactionKindController extends \App\Http\Controllers\Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        try {
            $now = Date::getNow();
            $insertedReactionKinds = [];
            foreach($request['data'] as $data) {
                $insertedReactionKinds[] = [
                    'reaction_kind_name' => $data['reaction_kind_name'],
                    'created_at' => $now
                ];

            }
            // Log::info($insertedReactionKinds);
            $messageToolRepository->createReactionKinds($insertedReactionKinds);
            
            return response()->json([
                'error' => false
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
     * @param  \App\Models\ReactionKind  $reactionKind
     * @return \Illuminate\Http\Response
     */
    public function show(ReactionKind $reactionKind)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ReactionKind  $reactionKind
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReactionKind $reactionKind)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReactionKind  $reactionKind
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReactionKind $reactionKind)
    {
        //
    }
}
