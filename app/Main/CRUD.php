<?php

namespace App\Main;

use App\Libraries\PeopleFetch;

class CRUD
{

    public function getAllContacts()
    {

        $fetch = new PeopleFetch();

        $contacts=  $fetch->fetchAll();

        if ($contacts) return array('success' => 'true', 'contacts' => $contacts);
        return array('success' => false);
    }
    
}