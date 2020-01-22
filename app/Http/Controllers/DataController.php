<?php

namespace App\Http\Controllers;

use App;

use Illuminate\Http\Request;

use JeroenDesloovere\VCard\VCard;

class DataController extends Controller
{
    public function load() {
        $contacts = 
        array(
          array (
            'icon' => '',
            'name' => 'XRabindranath Tagore',
            'contact' => 
            array (
              'phone' => 
              array (),
              'email' => 
              array (),
            ),
          ),
          array (
            'icon' => 'office.jpg',
            'name' => 'DRabindranath Tagore',
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
            'icon' => '',
            'name' => 'PRabindranath Tagore',
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
            'icon' => '',
            'name' => 'TRabindranath Tagore',
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
            'icon' => '',
            'name' => 'AARabindranath Tagore',
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
            'icon' => 'office.jpg',
            'name' => 'ARabindranath Tagore',
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
        return response(array('success' => true, 'contacts' => $contacts), 200)
                ->header('Content-Type', 'application/json');
    }

    public function delete() {
        return response('true', 200)
                ->header('Content-Type', 'text/plain');
    }

    public function download (Request $request) {

      $contact = json_decode($request->contact, true);

      // return response()->json($contact);

      $vcard = new VCard();

      // define variables
      $firstname = '';
      $lastname = '';
      $name = explode(' ', $contact['name']);
      if (count($name) > 0) {
          $firstname = $name[0];
          if (count($name) > 1) {
              $lastname = $name[1];
          }
      } 

      $additional = '';
      $prefix = '';
      $suffix = '';

      // add personal data
      $vcard->addName($lastname, $firstname, $additional, $prefix, $suffix);

      // add work data
      for ($i=0; $i < count($contact['phone']); $i++) { 
          $vcard->addPhoneNumber($contact['phone'][$i], 'WORK');
      }
      for ($i=0; $i < count($contact['mail']); $i++) { 
          $vcard->addEmail($contact['mail'][$i]);
      }
      // if (strlen($contact['icon']) > 1) {
      //     $vcard->addPhoto(public_path() . '\img\\'.$contact['icon']);
      // }

      // return vcard as a string
      // return response($vcard);

      // return vcard as a download
      return $vcard->download();

    }
    
}
