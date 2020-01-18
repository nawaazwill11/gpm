<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PeopleAuthController extends Controller
{
    public function __construct () {

        // $this->middleware('auth');
    }

    public function auth() {
        return view('people_auth');
    }
}
