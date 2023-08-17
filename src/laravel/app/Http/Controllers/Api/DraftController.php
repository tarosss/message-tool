<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use Illuminate\Http\Response;
use Log;

class DraftController extends \App\Http\Controllers\Controller
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
    public function show(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $response = [
            'error' => false,
            'message' => '',
            'drafts' => [],
        ];
        $code = Response::HTTP_OK;

        try {
            $drafts = $messageToolRepository->getDrafts([
                'user_id' => $request->input('userId'),
            ]);
            
            $response['drafts'] = array_column($drafts, null, 'draft_key');
        } catch (Exception $e) {
            $response = [
                'error' => true,
                'message' => $e->getMessage(),
                'drafts' => [],
            ];
            $code = Response::HTTP_BAD_REQUEST;
        } finally {
            return response()->json($response, $code);
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
    public function update(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $response = [
            'error' => false,
            'message' => '',
        ];
        $code = Response::HTTP_OK;

        try {
            foreach($request->input('data') as $data) {
                $wheres = \App\Facades\DraftUtils::getUpsertKey($data);
                $messageToolRepository->upsertDrafts(
                    $data,
                    $wheres,
                );
            }
        } catch (Exception $e) {
            $response = [
                'error' => true,
                'message' => $e->getMessage(),
            ];
            $code = Response::HTTP_BAD_REQUEST;
        } finally {
            return response()->json($response, $code);
        }
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
