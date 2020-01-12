<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use \App\Users;

class HomeController extends Controller
{
    public function index() {
        return view('index');
    }
    
    public function profile() {
        return view('profile');
    }

    public function about() {
        return view('about');
    }
}
