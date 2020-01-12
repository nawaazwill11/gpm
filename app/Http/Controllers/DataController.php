<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataController extends Controller
{
    public function load() {
        $contacts = 
        array(
          array (
            'icon' => 'img/office.jpg',
            'name' => 'Rabindranath Tagore',
            'contact' => 
            array (
              'phone' => 
              array (
                0 => '+919737177329',
                1 => '+919558484794',
              ),
              'email' => 
              array (
                0 => 'mastermindjim@gmail.com',
              ),
            ),
          ),
          array (
            'icon' => 'img/office.jpg',
            'name' => 'Rabindranath Tagore',
            'contact' => 
            array (
              'phone' => 
              array (
                0 => '+919737177329',
                1 => '+919558484794',
              ),
              'email' => 
              array (
                0 => 'mastermindjim@gmail.com',
              ),
            ),
          ),
          array (
            'icon' => 'img/office.jpg',
            'name' => 'Rabindranath Tagore',
            'contact' => 
            array (
              'phone' => 
              array (
                0 => '+919737177329',
                1 => '+919558484794',
              ),
              'email' => 
              array (
                0 => 'mastermindjim@gmail.com',
              ),
            ),
          ),
          array (
            'icon' => 'img/office.jpg',
            'name' => 'Rabindranath Tagore',
            'contact' => 
            array (
              'phone' => 
              array (
                0 => '+919737177329',
                1 => '+919558484794',
              ),
              'email' => 
              array (
                0 => 'mastermindjim@gmail.com',
              ),
            ),
          ),
          array (
            'icon' => 'img/office.jpg',
            'name' => 'Rabindranath Tagore',
            'contact' => 
            array (
              'phone' => 
              array (
                0 => '+919737177329',
                1 => '+919558484794',
              ),
              'email' => 
              array (
                0 => 'mastermindjim@gmail.com',
              ),
            ),
          ),
        );
        return response($contacts, 200)
                ->header('Content-Type', 'application/json');
    }
}
