<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Point;
use App\Models\Survey;
use App\Models\Result;
use App\Models\ResultDetail;
use App\Models\ResultRank;
use Illuminate\Support\Facades\Log;
use Config;


class TakeController extends Controller
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

        $max_page = floor( Survey::where('status', 1)->count() / 12 );

        $points = Point::where('status', 1)->orderBy('score', 'asc')->get();

        return view('pages.take.index', [ 'hash' => $hash, 'page' => 0, 'max_page' => $max_page, 'points' => $points ]);
    }

    public function ajax(Request $req, $type)
    {
        switch ($type) {
            case 'get_survey':
                $hash   = trim( $req->input('hash') );

                $resp = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );
                $result = Result::where('hash', $hash)->first();     
                Log::debug('###Result.'.$result);           
                if( $result === null || !isset( $result ) ){                    
                    $resp['msg'] = Config::get('constants.E_INVALID');

                } elseif(!empty($result)){
                    $page   = intval( $req->input('page'), 10 );

                    $surveys= DB::table('surveys')
                        ->select('surveys.*')
                        ->where('status', 1)
                        ->orderBy('display_order', 'asc')
                        ->offset( $page * 12 )
                        ->limit( 12 )
                        ->get();

                    $resp['code'] = 0;
                    $resp['msg'] = Config::get('constants.S_OK');
                    $resp["surveys"] = $surveys;
                }
               
                Log::debug('##Resp.',$resp);
                return response($resp)
                    ->header('Content-Type', 'application/json');

                break;

            case 'submit_survey':
                $resp = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $hash   = trim( $req->input('hash') );
                $result = Result::where('hash', $hash)->first();
                if( $result === null || !isset( $result ) ){

                    $resp['msg'] = Config::get('constants.E_INVALID');

                } elseif(!empty($result)) {

                    $result->status = 2;
                    $result->save();

                    $answer = $req->input('answer');

                    for( $i = 0; $i < count( $answer ); $i ++ ){

                        $detail = ResultDetail::where('result_id', $result->id)
                            ->where('survey_id', $answer[$i]['survey_id'])
                            ->first();

                        $detail->point_id = $answer[$i]['point_id'];
                        $detail->save();
                    }

                    $resp['code'] = 0;
                    $resp['msg'] = Config::get('constants.S_OK');
                }

                return response($resp)
                    ->header('Content-Type', 'application/json');

                break;

            case 'finish_survey':
                $resp = array('code'=>-1, 'msg'=> Config::get('constants.E_FAILED') );

                $hash   = trim( $req->input('hash') );
                $result = Result::where('hash', $hash)->first();
                if( $result === null || !isset( $result ) ){

                    $resp['msg'] = Config::get('constants.E_INVALID');

                } elseif(!empty($result)) {

                    $result->status = 4;
                    $result->save();

                    $answer = $req->input('answer');

                    for( $i = 0; $i < count( $answer ); $i ++ ){

                        $detail = ResultDetail::where('result_id', $result->id)
                            ->where('survey_id', $answer[$i]['survey_id'])
                            ->first();

                        $detail->point_id = $answer[$i]['point_id'];
                        $detail->save();
                    }

                    $details = ResultDetail::where('result_id', $result->id)->get();
                    ResultRank::where('result_id', $result->id)->update(['score' => 0]);

                    for( $i = 0; $i < count( $details ); $i ++ ){
                        $survey = Survey::find( $details[$i]->survey_id );

                        if( $details[$i]->point_id > 0 ){
                            $point  = Point::find( $details[$i]->point_id );

                            $rank = ResultRank::where('result_id', $result->id)
                                ->where('category_id', $survey->category_id)
                                ->first();

                            $rank->score = $rank->score + $point->score;
                            $rank->save();
                        }
                    }

                    $resp['hash'] = $result->hash;
                    $resp['code'] = 0;
                    $resp['msg'] = Config::get('constants.S_OK');
                }

                return response($resp)
                    ->header('Content-Type', 'application/json');

                break;

            default:
                break;
        }
    }
}
