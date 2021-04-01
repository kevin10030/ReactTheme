<?php

namespace App\Http\Controllers;

use App\Mail\RequestStrategicSession;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\StrategicRequest;
use Psy\Util\Str;

class StrategicRequestController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function index(){
        return view('pages.strategic.request');
    }

    public function ajax(Request $req, $type)
    {
        switch ( $type ) {

            case 'request_strategic_session':
                $first_name     = trim( $req->input('first_name') );
                $last_name      = trim( $req->input('last_name') );
                $business_email = trim( $req->input('business_email') );
                $phone          = trim( $req->input('phone') );
                $company_name   = trim( $req->input('company_name') );
                $country        = trim( $req->input('country') );
                $company_size   = intval( $req->input('company_size'), 10);
                $facebook       = trim( $req->input('facebook') );

                $data = new StrategicRequest;
                $data->first_name       = $first_name;
                $data->last_name        = $last_name;
                $data->business_email   = $business_email;
                $data->phone            = $phone;
                $data->company_name     = $company_name;
                $data->country          = $country;
                $data->company_size     = $company_size;
                $data->facebook         = $facebook;
                $data->save();

                \Mail::to("benjamin@mrs.center")->send(new RequestStrategicSession( $data ));

                return redirect('strategic/thank');

                break;

            default:
                break;
        }
    }
}
