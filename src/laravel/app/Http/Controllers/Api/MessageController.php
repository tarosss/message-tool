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

            $insertedMessages = [];
            $insertedFiles = [];
            foreach($request['data'] as $data) {
                $threadMessageId = $data['thread_message_id'] ?? null;
                $insertedMessage = $messageToolRepository->createMessage([
                    'message' => $data['message'],
                    'user_id' => $data['user_id'],
                    'storage' => $storage->getDisk(),
                    'channel_id' => $data['channel_id'],
                    'thread_message_id' => $threadMessageId,
                    'thread' => [],
                    'files' => [],
                    'reactions' => $data['reactions'] ?? [],
                ]);

                if ($threadMessageId) {
                    // スレッド元のメッセージのデータ変更
                    $messageToolRepository->pushMessage($threadMessageId, 'thread', $insertedMessage->_id);
                }

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

    public function store2(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        Log::info($request);
        $code = Response::HTTP_CREATED;
        $response = [
            'error' => false,
            'message' => null,
            'created_message' => [],
        ];

        try {
            $storage = \App\Factories\StorageFactory::getStorage();
            $nowString = \App\Facades\Date::getNowString();
            $threadMessageId = $request->input('thread_message_id') ?? null;
            $message = [
                'message' => $request->input('message'),
                'user_id' => $request->input('user_id'),
                'storage' => $storage->getDisk(),
                'channel_id' => $request->input('channel_id'),
                'thread_message_id' => $threadMessageId,
                'thread' => $request->input('thread') ?? [],
                'files' => $request->input('files') ?? [],
                'reactions' => $request->input('reactions') ?? [],
            ];
            

            if ($threadMessageId) {
                // スレッド元のメッセージのデータ変更
                $messageToolRepository->pushMessage($threadMessageId, 'thread', $insertedMessage->_id);
            }

            // draftの時点で登録されてないファイルの確認
            foreach($request->file() ?? [] as $fileData) {
    
                if ($fileData['sended'] == 1) {
                    continue;
                }
                $file = $fileData['file'];
                $originalFileName = $file->getClientOriginalName();
                // ファイルを保存してファイル名を保存する
                $message['files'][$originalFileName]['file_name'] = FileUtils::putFile($storage, 'message', $file);
            }
    
            // messageテーブルようの_idの配列
            $_ids = [];
            // レスポンス用の作成されたFileのデータ
            $createdFiles = [];
            // ファイルデータをFileテーブルに保存
            foreach($message['files'] as $fileData) {
                $createdFile = $messageToolRepository->createFile($fileData);
                $_ids[] = $createdFile['_id'];
                $createdFiles[] = $createdFile;
            }
    
            // メッセージのほうのファイルは_idの配列に変更
            $message['files'] = $_ids;
            $createdMessage = $messageToolRepository->createMessage($message);
    
            broadcast(new \App\Events\CreateMessage([$createdMessage], $createdFiles));
            // if ($createdFiles) {
            //     // ファイルありのメッセージの場合はファイルのEventを実行する
            //     broadcast(new \App\Events\CreateFile($createdFiles));
            // }
        } catch (Exception $e){
            Log::error($e);
            $code = Response::HTTP_BAD_REQUEST;
            $response = [
                'error' => true,
                'message' => $e->getMessage(),
            ];
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
            $messageToolRepository->updateMessage(['_id' => $request->input('_id')], $request->all());
            $message = $messageToolRepository->getMessage(['_id' => $request->input('_id')]);

            broadcast(new \App\Events\UpdateMessage([$message]));

            return response()->json([
                'error' => false,
                'message' => $message,
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ], Response::HTTP_OK);
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
