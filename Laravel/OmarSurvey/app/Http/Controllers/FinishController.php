<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Models\Category;
use App\Models\Result;
use App\Models\ResultRank;
use PDF;
use Excel;
use App\Exports\ExcelResult;

class FinishController extends Controller
{
    public function __construct()
    {

    }

    public function index(Request $req, $hash)
    {
        $result = Result::where('hash', $hash)->first();

        if( $result === null || !isset( $result ) ){
            return redirect('home');
        }

        $ranks = ResultRank::where('result_id', $result->id)->orderBy('score', 'desc')->get();
        for( $i = 0; $i < count( $ranks ); $i ++ ){
            $category = Category::find( $ranks[$i]->category_id );
            $ranks[$i]['category'] = $category;
        }

        return view('pages.finish.index', [ 'hash' => $hash, 'ranks' => $ranks ]);
    }

    public function pdf(Request $req, $hash)
    {
        $result = Result::where('hash', $hash)->first();
        $ranks = ResultRank::where('result_id', $result->id)->orderBy('score', 'desc')->get();
        for( $i = 0; $i < count( $ranks ); $i ++ ){
            $category = Category::find( $ranks[$i]->category_id );
            $ranks[$i]['category'] = $category;
        }

        File::delete(storage_path('app') . '/pdf/' . $result->hash . '.pdf');

        PDF::loadView('pages.result.pdf', [
            'result'    => $result,
            'ranks'     => $ranks
        ])->setPaper('a4')
            ->setOrientation('portrait')
            ->setOption('margin-bottom', '2cm')
            ->setOption('margin-top', '2cm')
            ->setOption('margin-left', '1cm')
            ->setOption('margin-right', '1cm')
            ->save(storage_path('app') . '/pdf/' . $result->hash . '.pdf');

        return response()->download(storage_path('app') . '/pdf/' . $result->hash . '.pdf');
    }

    public function excel(Request $req, $hash)
    {
        $result = Result::where('hash', $hash)->first();
        return Excel::download(new ExcelResult( $result->id ), $result->hash . '.xlsx');
    }
}