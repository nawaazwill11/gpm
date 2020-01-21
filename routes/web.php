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

Auth::routes();

// App navigation
Route::get('/', 'NavController@index')->name('index');
Route::get('/home', 'NavController@index')->name('home');
Route::get('/profile', 'NavController@profile')->name('profile');
Route::get('/about', 'NavController@about')->name('about');
Route::get('/people', 'NavController@people')->name('people');
Route::get('/authorized', 'NavController@authorized')->name('authorized');

// Contacts api routes
Route::get('/delete', 'DataController@delete');
Route::post('/download/{contact}', 'DataController@download');

// People Api routes
Route::get('/people/loadContacts', 'PeopleApiController@load');
// Route::get('/people/loadContacts', 'DataController@load');
Route::get('/people/auth', 'PeopleApiController@auth');
Route::get('/people/ping', 'PeopleApiController@ping');
Route::get('/people/redirect', 'PeopleApiController@redirect');

// Testing
// Route::get('/test', 'Auth\PeopleAuthController@sessionAdder');
Route::get('/test', 'testController@test');
Route::get('/getclient', 'PeopleApiController@api');
Route::get('/cacheget', 'testController@cacheGet');
Route::get('/cacheset', 'testController@cacheSet');
Route::get('/cacheempty', 'testController@cacheEmpty');
Route::get('/fetch', 'testController@fetchContacts');