<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use App\Facades\StringUtils;
use App\Facades\MimeType;
use App\Facades\Date;
use App\Facades\ArrayUtils;
use Exception;
use Log;
class ReactionController extends \App\Http\Controllers\Controller
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
        try {
            $storage = \App\Factories\StorageFactory::getStorage();
            $now = Date::getNow();
    
            $insertedReactions = [];
            foreach($request['data'] as $data) {
                $file = $data['icon_path'];
                // $data['file'] 
                $fileName = (function () use ($file) {
                    $fileName = StringUtils::getRandomString(30);
                    Log::emergency($file->getMimeType());
                    $extention = MimeType::getExtentionFromMimeType($file->getMimeType());
                    return $fileName . '.' . $extention;
                })();
    
                $storage->putFileAs('reactions', $file, $fileName);
    
                $insertedReactions[] = [
                    'reaction_name' => $data['reaction_name'],
                    'reaction_kinds' => $data['reaction_kinds'] ?? [],
                    'icon_path' => $fileName,
                    // 'create_user' => $data['create_user'],
                    'createbard_at' => $data['bar'],
                    'created_at' => $now
                ];
            }
    
            $messageToolRepository->createReactions($insertedReactions);

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
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        try {
            $reactions = $messageToolRepository->getReactions();
            if ($request->has('by')) {
                $reactions = array_column($reactions, null, $request->input('by'));
            }
            return response()->json([
                'error' => false,
                'reactions' => $reactions,
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
