<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StrategicThankController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function index(){
        return view('pages.strategic.thank');
    }

    public function ajax(Request $req, $type)
    {
        switch ( $type ) {
            default:
                break;
        }
    }
}
