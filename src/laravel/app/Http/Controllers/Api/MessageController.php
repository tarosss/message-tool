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

            $insertFiles = [];
            foreach($request['data'] as $data) {
                Log::info($data);
                $insertedMessage = $messageToolRepository->createMessage([
                    'message' => $data['message'],
                    'member_id' => $data['member_id'],
                    'storage' => $storage->getDisk(),
                    'sended' => $data['sended']
                ]);

                foreach($data['files'] as $file) {
                    $fileName = (function () use ($file) {
                        $fileName = StringUtils::getRandomString(30);
                        $extention = MimeType::getExtentionFromMimeType($file->getMimeType());
                        return $fileName . '.' . $extention;
                    })();
                    // ファイルを保存する
                    $storage->putFileAs('message', $file, $fileName);
                    
                    $insertFiles[] = [
                        'message_id' => $insertedMessage->_id,
                        'original_file_name' => $file->getClientOriginalName(),
                        'file_name' => $fileName,
                        'created_at' => $now,
                    ];
                }
            }


            // ファイルの保存


            // テキストベースのデータ
            $messageToolRepository->createFiles($insertFiles);

            // ファイルの保存
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
