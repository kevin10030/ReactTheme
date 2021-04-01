<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EBookThankController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function index(){
        return view('pages.ebook.thank');
    }

    public function ajax(Request $req, $type)
    {
        switch ( $type ) {
            default:
                break;
        }
    }
}
