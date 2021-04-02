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
use App\Exports\ExcelSurveyor;

class ResultController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        return view('pages.result.index');
    }

    public function detail(Request $req, $id)
    {
        $result = Result::find( $id );
        $ranks = ResultRank::where('result_id', $id)->orderBy('score', 'desc')->get();
        for( $i = 0; $i < count( $ranks ); $i ++ ){
            $category = Category::find( $ranks[$i]->category_id );
            $ranks[$i]['category'] = $category;
        }

        return view('pages.result.detail', ['result' => $result, 'ranks' => $ranks]);
    }

    public function ajax(Request $req, $type)
    {

        switch ($type) {

            case 'load':
                $p_start = intval($req->input('start'), 10);
                $p_length = intval($req->input('length'), 10);
                $p_order = $req->input('order');
                $p_search = $req->input('search');

                $cols = array('No', 'first_name', 'last_name', 'email', 'gender', 'age', 'status', 'created_at', 'updated_at');

                $start = $p_start >= 0 ? $p_start : 0;
                $length = $p_length >= 5 && $p_length <= 100 ? $p_length : 5;

                $order = "";
                for ($i = 0; $i < count($p_order); $i++) {
                    $order .= $cols[$p_order[$i]['column']] . " " . $p_order[$i]['dir'];

                    if ($i < count($p_order) - 1)
                        $order .= ", ";
                }

                $search = trim($p_search['value']);

                $total = 0;
                $totalAfterFilter = 0;

                $total = Result::count();

                $totalAfterFilter = DB::table('results')
                    ->select('results.*')
                    ->orWhere('results.first_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('results.last_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('results.email', 'LIKE', '%' . $search . '%')
                    ->count();

                $data = DB::table('results')
                    ->select('results.*')
                    ->orWhere('results.first_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('results.last_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('results.email', 'LIKE', '%' . $search . '%')
                    ->orderByRaw($order)
                    ->offset($start)
                    ->limit($length)
                    ->get();

                $result["recordsTotal"] = $total;
                $result["recordsFiltered"] = $totalAfterFilter;
                $result["data"] = $data;

                return response($result)
                    ->header('Content-Type', 'application/json');

                break;

            default:
                break;
        }
    }

    public function pdf(Request $req, $id)
    {
        $result = Result::find( $id );
        $ranks = ResultRank::where('result_id', $id)->orderBy('score', 'desc')->get();
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

    public function excel(Request $req, $id)
    {
        $result = Result::find( $id );

        return Excel::download(new ExcelResult( $id ), $result->hash . '.xlsx');
    }

    public function excelSurveyor(Request $req)
    {
        return Excel::download(new ExcelSurveyor(), 'surveyor_' . time() . '.xlsx');
    }
}
