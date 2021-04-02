<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use Config;

class CategoryController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        return view('pages.category.index');
    }

    public function ajax(Request $req, $type)
    {

        switch ($type) {

            case 'load':
                $p_start = intval($req->input('start'), 10);
                $p_length = intval($req->input('length'), 10);
                $p_order = $req->input('order');
                $p_search = $req->input('search');

                $cols = array('No', 'section', 'name', 'definition', 'description', 'status', 'created_at', 'updated_at');

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

                $total = Category::count();

                $totalAfterFilter = DB::table('categories')
                    ->select('categories.*')
                    ->orWhere('section', 'LIKE', '%' . $search . '%')
                    ->orWhere('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('definition', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->count();

                $data = DB::table('categories')
                    ->select('categories.*')
                    ->orWhere('section', 'LIKE', '%' . $search . '%')
                    ->orWhere('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('definition', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
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

            case 'create':
                $section        = trim( $req->input('section') );
                $name           = trim( $req->input('name') );
                $definition     = trim( $req->input('definition') );
                $description    = trim( $req->input('description') );

                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $dup_count = Category::where('name', $name)->count();

                if( $dup_count > 0 ){
                    $result['code'] = 1;
                    $result['msg'] = Config::get('constants.E_DUPLICATED');
                } else {
                    $data = new Category;
                    $data->section          = $section;
                    $data->name             = $name;
                    $data->definition       = $definition;
                    $data->description      = $description;
                    $data->save();

                    $result['code'] = 0;
                    $result['msg'] = Config::get('constants.S_OK');
                }

                return response( $result )
                    ->header('Content-Type', 'text/html');

                break;

            case 'update':
                $id             = intval( $req->input('id'), 10);
                $section        = trim( $req->input('section') );
                $name           = trim( $req->input('name') );
                $definition     = trim( $req->input('definition') );
                $description    = trim( $req->input('description') );

                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $dup_count = Category::where('name', $name)
                    ->where('id', '!=', $id)
                    ->count();

                if( $dup_count > 0 ){
                    $result['code'] = 1;
                    $result['msg'] = Config::get('constants.E_DUPLICATED');
                } else {
                    $data = Category::find( $id );
                    $data->section          = $section;
                    $data->name             = $name;
                    $data->definition       = $definition;
                    $data->description      = $description;
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
                    $row = Category::find( $id );
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
                    $row = Category::find( $id );
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
                    $row = Category::find( $id );
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
