<?php

namespace App\Http\Controllers;

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
        return response($contacts, 200)
                ->header('Content-Type', 'application/json');
    }

    public function delete() {
      return response('true', 200)
              ->header('Content-Type', 'text/plain');
    }

    public function download (Request $request) {
      $contact = $request('contact');
      $out = new \Symfony\Component\Console\Output\ConsoleOutput();
      $out->writeln($contact);


      $vcard = new VCard();

      // define variables
      $lastname = 'Desloovere';
      $firstname = 'Jeroen';
      $additional = '';
      $prefix = '';
      $suffix = '';

      // add personal data
      $vcard->addName($lastname, $firstname, $additional, $prefix, $suffix);

      // add work data
      $vcard->addCompany('Siesqo');
      $vcard->addJobtitle('Web Developer');
      $vcard->addRole('Data Protection Officer');
      $vcard->addEmail('info@jeroendesloovere.be');
      $vcard->addPhoneNumber(1234121212, 'PREF;WORK');
      $vcard->addPhoneNumber(123456789, 'WORK');
      $vcard->addAddress(null, null, 'street', 'worktown', null, 'workpostcode', 'Belgium');
      $vcard->addLabel('street, worktown, workpostcode Belgium');
      $vcard->addURL('http://www.jeroendesloovere.be');

      // $vcard->addPhoto(__DIR__ . '/landscape.jpeg');

      // return vcard as a string
      //return $vcard->getOutput();

      // return vcard as a download
      return $vcard->download();

    }
}
