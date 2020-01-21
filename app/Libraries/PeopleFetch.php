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
        
        $contacts = ContactParser::parse($results);

        return $contacts;

   }
}