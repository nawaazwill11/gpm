<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Main\PeopleAuth;
use App\Main\PeoplePing;
use App\Http\Controllers\Controller;


class PeopleApiController extends Controller
{
    public function __construct () 
    {
        $this->middleware('auth');
    }

    public function auth()
    {
        $people_auth = new PeopleAuth();
        return response($people_auth->authorize(), 200);
    }
    
    public function ping()
    {
        $people_ping = new PeoplePing();
        $people_ping->ping();
    }

    public function redirect(Request $request) 
    {
        $people_auth = new PeopleAuth();
        $authorized = $people_auth->reauth($request);
        
        // @param ['success' => bool]
        return view('authorized', ['success' => $authorized]);
    }
}