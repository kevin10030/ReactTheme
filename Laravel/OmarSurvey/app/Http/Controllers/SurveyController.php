<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Survey;
use App\Models\Category;
use Config;

class SurveyController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $categories = Category::where('status', 1)->orderBy('name', 'asc')->get();
        return view('pages.survey.index', [ 'categories' => $categories ]);
    }

    public function ajax(Request $req, $type)
    {

        switch ($type) {

            case 'load':
                $p_start = intval($req->input('start'), 10);
                $p_length = intval($req->input('length'), 10);
                $p_order = $req->input('order');
                $p_search = $req->input('search');

                $cols = array('No', 'display_order', 'category_name', 'question', 'status', 'memo', 'created_at', 'updated_at');

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

                $total = Survey::count();

                $totalAfterFilter = DB::table('surveys')
                    ->select('surveys.*', 'categories.name as category_name')
                    ->leftJoin('categories', 'surveys.category_id', '=', 'categories.id')
                    ->orWhere('categories.name', 'LIKE', '%' . $search . '%')
                    ->orWhere('surveys.question', 'LIKE', '%' . $search . '%')
                    ->orWhere('surveys.memo', 'LIKE', '%' . $search . '%')
                    ->count();

                $data = DB::table('surveys')
                    ->select('surveys.*', 'categories.name as category_name')
                    ->leftJoin('categories', 'surveys.category_id', '=', 'categories.id')
                    ->orWhere('categories.name', 'LIKE', '%' . $search . '%')
                    ->orWhere('surveys.question', 'LIKE', '%' . $search . '%')
                    ->orWhere('surveys.memo', 'LIKE', '%' . $search . '%')
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

            case 'get_display_order':
                $display_order_max  = intval( Survey::max('display_order'), 10);
                $display_order_new  = sprintf('%d', $display_order_max + 1);

                $result['display_order'] = $display_order_new;

                return response( $result )
                    ->header('Content-Type', 'text/html');

                break;

            case 'create':
                $category_id    = intval( $req->input('category_id'), 10 );
                $display_order  = intval( $req->input('display_order'), 10 );
                $question       = trim( $req->input('question') );
                $memo           = trim( $req->input('memo') );

                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $dup_count = Survey::where('question', $question)->count();

                if( $dup_count > 0 ){
                    $result['code'] = 1;
                    $result['msg'] = Config::get('constants.E_DUPLICATED');
                } else {
                    $data = new Survey;
                    $data->category_id      = $category_id;
                    $data->display_order    = $display_order;
                    $data->question         = $question;
                    $data->memo             = $memo;
                    $data->save();

                    $result['code'] = 0;
                    $result['msg'] = Config::get('constants.S_OK');
                }

                return response( $result )
                    ->header('Content-Type', 'text/html');

                break;

            case 'update':
                $id             = intval( $req->input('id'), 10);
                $category_id    = intval( $req->input('category_id'), 10);
                $display_order  = intval( $req->input('display_order'), 10);
                $question       = trim( $req->input('question') );
                $memo           = trim( $req->input('memo') );

                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $dup_count = Survey::where('question', $question)
                    ->where('id', '!=', $id)
                    ->count();

                if( $dup_count > 0 ){
                    $result['code'] = 1;
                    $result['msg'] = Config::get('constants.E_DUPLICATED');
                } else {
                    $data = Survey::find( $id );
                    $data->category_id      = $category_id;
                    $data->display_order    = $display_order;
                    $data->question         = $question;
                    $data->memo             = $memo;
                    $data->save();

                    $result['code'] = 0;
                    $result['msg'] = Config::get('constants.S_OK');
                }

                return response( $result )
                    ->header('Content-Type', 'text/html');

                break;

            case 'delete':
                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $id = intval( $req->input('id'), 10);

                if( $id > 0 ){
                    $row = Survey::find( $id );
                    $row->delete();

                    $result['code'] = 0;
                    $result['msg']  = Config::get('constants.S_OK');
                }

                return response( $result )
                    ->header('Content-Type', 'text/json');

                break;

            case 'enable':
                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $id = intval( $req->input('id'), 10);

                if( $id > 0 ){
                    $row = Survey::find( $id );
                    $row->status    = 1;
                    $row->save();

                    $result['code'] = 0;
                    $result['msg']  = Config::get('constants.S_OK');
                }

                return response( $result )
                    ->header('Content-Type', 'text/json');
                break;

            case 'disable':
                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $id = intval( $req->input('id'), 10);

                if( $id > 0 ){
                    $row = Survey::find( $id );
                    $row->status    = 2;
                    $row->save();

                    $result['code'] = 0;
                    $result['msg']  = Config::get('constants.S_OK');
                }

                return response( $result )
                    ->header('Content-Type', 'text/json');
                break;

            default:
                break;
        }
    }
}
