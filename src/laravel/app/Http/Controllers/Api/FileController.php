<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use App\Facades\StringUtils;
use App\Facades\MimeType;
use App\Facades\Date;

use Exception;
use Log;

class FileController extends \App\Http\Controllers\Controller
{
    private $error = false;
    private $code = Response::HTTP_OK;
    private $message;

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
        $response = [
            'error' => false,
            'message' => '',
            'messages' => []
        ];
        
        $code = Response::HTTP_CREATED;

        // データベースに入っている途中変更のメッセージを登録するさいの処理を追加する必要がある
        try {
            $storage = \App\Factories\StorageFactory::getStorage();

            $now = Date::getNow();

        } catch (Exception $e) {
            Log::error($e);
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
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $code = Response::HTTP_OK;
        $response = [
            'error' => true,
            'message' => null,
            'files' => [],
        ];

        try {
            $files = $messageToolRepository->getFiles();


            $response['files'] = array_column($files, null, '_id');
        } catch (Exception $e) {
            Log::error($e);
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
        try {
            foreach($request['data'] as $data) {
                Log::info($data);
                $messageToolRepository->updateMessage($data['_id'], $data);
            }

            broadcast(new \App\Events\UpdateMessage($request['data']));
        } catch (Exception $e) {
            $this->error = true;
            $this->code = Response::HTTP_BAD_REQUEST;
            $this->message = $e->getMessage();
            Log::error($e);
        } finally {
            return response()->json([
                'error' => $this->error,
                'message' => $this->message
            ], $this->code);
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