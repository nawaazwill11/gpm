<?php

namespace App\Libraries;

use App\Libraries\PeopleLib;

use Google_Service_PeopleService;

class PeopleFetch
{
   public function fetchAll()
   {
       $people = new PeopleLib();
       $client = $people->setClient();
       
       if(!$client) return false;

        // Createa a people service instance.
        $people_service = new Google_Service_PeopleService($client);

        $results = $people_service->people_connections->listPeopleConnections(
            'people/me', array('pageSize' => 10, 'personFields' => 'names,emailAddresses,phoneNumbers,photos'));
        
        $person_array = [];
        $__person = [];
        if (!count($results->getConnections()) == 0) {
            print "People:\n";
            $it = 0;
            foreach ($results->getConnections() as $person) {
                array_push($__person, $person->getPhotos());
                $_person = [];
                if (count($person->getNames()) == 0) {
                    array_push($_person, 'no name');
                } else if(count($person->getPhoneNumbers()) == 0) {
                    array_push($_person, '--');
                }
                else {
                    $names = $person->getNames();
                    $name = $names[0];
                    $phoneNumber = $person->getPhoneNumbers();
                    array_push($_person, $name->getDisplayName(), $phoneNumber);
                }
                array_push($person_array, $_person);
            }
           dd($results, $person_array, $__person);
        }
        // $parser = new ContactParser();
        // $parser->parse($result);
        
        // fetch all contacts from google account.

   }
}