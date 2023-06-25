<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Symfony\Component\VarDumper\VarDumper;
use App\Models\Sample;
use App\Models\Item;

use Log;
use DB;

class SampleController extends Controller
{
    //

    public function index()
    {
        // var_dump(Sample::all());
        // $sample = new Sample;
        // $sample->fill([
        //     'sample_id' => 100,
        //     'sample_name' => 1000,
        //     'sample_name2' => [
        //         'sub-sample' => 100000,
        //         'sub-sub' => '日ハム最強'
        //     ],
            
        // ])->save();
        $sample = Sample::where('sample_id', 12);
            


        // Log::debug($sample->first()->items());
        Log::debug($sample->first()->delete());
        // Log::debug(Item::with('sample')->get()->toArray());
        // $sample->increment('sample_id', 1, ['group' => 'Kitty', 'group2' => ['sub-sample' => 10]]);
        return view('index');
    }
}
