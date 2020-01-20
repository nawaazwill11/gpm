<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\PeopleApiController;
use App\Libraries\_Cache;
class testController extends Controller
{
    public function test() {
      dd(session()->all());
    }

    public static function cacheSet(Request $request) {

        // $obj = new PeopleApiControll

        _Cache::addNew('client', 'la tantola');
        dd('set');
    }
    public function cacheGet(Request $request) {
        dd(_Cache::hasKey($request->name));
    }

    public function cacheEmpty() {
        _Cache::remove('client');
        dd('empty');
    }


}
