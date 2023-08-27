<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Interfaces\Repositories\MessageToolRepositoryInterface;
use App\Factories\StorageFactory;
use App\Facades\FileUtils;
use App\Facades\DraftUtils;
use Illuminate\Support\Facades\Log as FacadesLog;
use Log;
use PhpParser\Node\Stmt\Foreach_;

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
     * テキストベースのデータの更新を行う.
     * ファイルは行わない
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
        
        $fileInfo = [];
        // Log::info($request);
        try {
            $draft = $request->all();
            $storage = StorageFactory::getStorage();
            $nowString = \App\Facades\Date::getNowString();
            // Log::info($request->file());

            $wheres = DraftUtils::getUpsertKey($request);
            // $oldDraft = $messageToolRepository->getDraft($wheres);
            // // すでに登録してあるファイル
            // $draft['files'] = $oldDraft['files'] ?? [];
            // // ファイルの保存

            // foreach($request->file('files') ?? [] as $fileData) {
            //     $file = $fileData['file'];

            //     $t = [
            //         'original_file_name' => $file->getClientOriginalName(),
            //         'file_name' => FileUtils::putFile($storage, 'message', $file),
            //         'sended' => 1,
            //         'created_at' => $nowString,
            //     ];

            //     $fileInfo[] = $t;
            //     $draft['files'][$t['original_file_name']] = $t;
            // }
            // テキストデータなどを保存
            $messageToolRepository->upsertDrafts(
                $draft,
                $wheres,
            );
                        
            $draft['files'] = $fileInfo;
            $response['draft'] = $draft;
        } catch (Exception $e) {
            Log::error($e);
            $response = [
                'error' => true,
                'message' => $e->getMessage(),
                'draft' => []
            ];
            $code = Response::HTTP_BAD_REQUEST;
        } finally {
            return response()->json($response, $code);
        }
    }

    /**
     * ファイルのアップロードをする
     */
    public function updateFile(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $response = [
            'error' => false,
            'message' => '',
        ];
        $code = Response::HTTP_OK;

        $files = [];
        try {
            $nowString = \App\Facades\Date::getNowString();
            $storage = StorageFactory::getStorage();


            $wheres = [
                'draft_key' => DraftUtils::getDraftKey(
                    $request->input('channel_id'),
                    $request->input('thread_message_id'),
                ),
                'user_id' => $request->input('user_id'),
            ];

            $currentDraftData = $messageToolRepository->getDraft($wheres);
            // データベースの値を更新するために取得
            $draftFiles = $currentDraftData['files'];
            
            foreach($request->file('files') as $file) {
                $fileName = FileUtils::putFile($storage, 'message', $file);
                
                $t = [
                    'original_file_name' => $file->getClientOriginalName(),
                    'file_name' => $fileName,
                    'created_at' => $nowString,
                ];

                $files[$fileName] = $t;
                $draftFiles[$fileName] = $t;
            }
            // 保存されたファイルをデータベースにも登録する
            $messageToolRepository->updateDraftFile(
                $wheres,
                $draftFiles,
            );

            $response['files'] = $files;
        } catch (Exception $e) {
            Log::error($e);
            $response = [
                'error' => true,
                'message' => $e->getMessage(),
                'files' => $files,
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
    public function destroy(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $response = [
            'error' => false,
            'message' => '',
        ];
        $code = Response::HTTP_OK;

        try {
            foreach($request->input('data') as $draft) {
                $wheres = \App\Facades\DraftUtils::getUpsertKey($draft);
                $messageToolRepository->deleteDraft($wheres);
            }

            $storage = StorageFactory::getStorage();
            // ファイルを削除する
            // $storage->deleteFile('draft');
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

    public function destroyFile(Request $request, MessageToolRepositoryInterface $messageToolRepository)
    {
        $response = [
            'error' => false,
            'message' => '',
        ];
        $code = Response::HTTP_OK;

        try {
            $storage = StorageFactory::getStorage();
            Log::info("val");
            // ファイルを削除する
            // $storage->deleteFile('message', $request->input('original_file_name'));
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

}
