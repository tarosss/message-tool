<?php

namespace App\Facades;
use Log;
class ArrayUtils
{
    /**
     * 共通のキーごとにまとめる
     */
    public static function commonKey(array $array, $key, $subKey = null): array
    {
        $temp = [];

        if ($subKey){
            // 配列をまとめる際にキーをつけて保存　キーが重複する場合上書きする
            foreach ($array as &$a) {
                $temp[$a[$key]][$a[$subKey]] = $a;
            }
        } else {
            foreach ($array as &$a) {
                if (isset($temp[$a[$key]])) {
                    $temp[$a[$key]][] = $a;
                } else {
                    $temp[$a[$key]] = [$a];
                }
            }
        }


        Log::info('jvak');
        Log::info($temp);
        return $temp;
    }
}