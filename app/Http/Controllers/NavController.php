<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Main\HomeLoad;

class NavController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index() 
    {
        return view('index');
    }
    
    public function profile() {
        return view('profile');
    }

    public function about() {
        return view('about');
    }

    public function people() {
        return view('people');
    }
    public function authorized() {
        return view('authorized');
    }
}
