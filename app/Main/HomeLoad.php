<?php

namespace App\Main;

use App\Libraries\PeopleLib;

class HomeLoad
{

    public function __contruct()
    {
        $people = new PeopleLib();
        $people->setClient();
        
        if ($people->setTokenToClient()) 
        {

        }

    }
}