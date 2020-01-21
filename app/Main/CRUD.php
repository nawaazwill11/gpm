<?php

namespace App\Main;

use App\Libraries\PeopleFetch;

class CRUD
{

    public function getAllContacts()
    {

        $fetch = new PeopleFetch();

        $raw_contacts=  $fetch->fetchAll;



        // $raw_contact = $fetch->fetchAll($this->client);
        // if (!$raw_contacts) return  array('success'=> false);
        // $parser =  new ContactParser();   
    }
    
}