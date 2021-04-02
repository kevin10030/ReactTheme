<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Survey;
use App\Models\Result;
use App\Models\ResultRank;
use App\Models\ResultDetail;
use Config;

class HomeController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $categories = Category::where('status', 1)->orderBy('name', 'asc')->get();
        return view('pages.home.index', [ 'categories' => $categories ]);
    }

    public function ajax(Request $req, $type)
    {

        switch ($type) {

            case 'create':
                $first_name     = trim( $req->input('first_name') );
                $last_name      = trim( $req->input('last_name') );
                $email          = trim( $req->input('email') );
                $gender         = trim( $req->input('gender') );
                $age            = intval( $req->input('age'), 10);

                $result = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $dup_count = Result::where('email', $email)->count();

                $data = new Result;
                $data->first_name       = $first_name;
                $data->last_name        = $last_name;
                $data->email            = $email;
                $data->gender           = $gender;
                $data->age              = $age;
                $data->hash             = md5( time() . $first_name . $last_name . $email . $gender . $age);
                $data->save();

                $categories = Category::where('status', 1)->orderBy('name', 'asc')->get();
                for( $i = 0; $i < count( $categories ); $i ++ ){
                    $rank = new ResultRank;
                    $rank->result_id    = $data->id;
                    $rank->category_id  = $categories[$i]->id;
                    $rank->score        = 0;
                    $rank->save();
                }

                $surveys = Survey::where('status', 1)->orderBy('display_order', 'asc')->get();
                for( $i = 0; $i < count( $surveys ); $i ++ ){
                    $detail = new ResultDetail;
                    $detail->result_id  = $data->id;
                    $detail->survey_id  = $surveys[$i]->id;
                    $detail->point_id   = 0;
                    $detail->save();
                }

                $result['code'] = 0;
                $result['msg']  = Config::get('constants.S_OK');
                $result['hash'] = $data->hash;

                return response( $result )
                    ->header('Content-Type', 'text/html');

                break;

            default:
                break;
        }
    }
}
