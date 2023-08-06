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

class MessageController extends \App\Http\Controllers\Controller
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
        // データベースに入っている途中変更のメッセージを登録するさいの処理を追加する必要がある
        try {
            $storage = \App\Factories\StorageFactory::getStorage();

            $now = Date::getNow();

            $insertedMessages = [];
            $insertedFiles = [];
            foreach($request['data'] as $data) {
                $insertedMessage = $messageToolRepository->createMessage([
                    'message' => $data['message'],
                    'user_id' => $data['userId'],
                    'storage' => $storage->getDisk(),
                    'channel_id' => $data['channelId'],
                    'reactions' => $data['reactions'] ?? [],
                ]);

                foreach($data['files'] ?? [] as $file) {
                    $fileName = (function () use ($file) {
                        $fileName = StringUtils::getRandomString(30);
                        $extention = MimeType::getExtentionFromMimeType($file->getMimeType());
                        return $fileName . '.' . $extention;
                    })();
                    // ファイルを保存する
                    $storage->putFileAs('message', $file, $fileName);
                    
                    $insertedFiles[] = [
                        'user_id' => $insertedMessage->_id,
                        'original_file_name' => $file->getClientOriginalName(),
                        'file_name' => $fileName,
                        'created_at' => $now,
                    ];
                }

                $insertedMessages[] = $insertedMessage;
            }


            broadcast(new \App\Events\CreateMessage($insertedMessages));
            if ($insertedFiles) {
                $messageToolRepository->createFiles($insertedFiles);
            }
            // テキストベースのデータ
            // event()
            // ファイルの保存
            return response()->json([
                'error' => false
            ], Response::HTTP_CREATED);

        } catch (Exception $e) {
            Log::error($e);
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
            $messages = $messageToolRepository->getMessages([
                // 'user_id' => $request->input('userId'),
            ]);
            if ($request->has('by')) {
                $messages = \App\Facades\ArrayUtils::commonKey(
                    $messages, 
                    $request->input('by'),
                    $request->has('messageKey') ? $request->input('messageKey') : null
                );
            }

            return response()->json([
                'error' => false,
                'messages' => $messages,
            ]);
        } catch (Exception $e) {
            Log::error($e);
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
