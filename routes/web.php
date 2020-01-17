<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');
Route::get('/profile', 'HomeController@profile');
Route::get('/about', 'HomeController@about');
Route::get('/loadContacts', 'DataController@load');
Route::get('/test', 'testController@test');
Route::get('/delete', 'DataController@delete');
Route::get('/download', 'DataController@download');