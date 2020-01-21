<?php

namespace App\Libraries;

class ContactParser
{
    public function parse($raw) 
    {
        dd($raw);
        $contacts = array();
        if ($raw['conections'])
        {
            foreach ($raw['connections'] as $people) {
                # code...
            }
        }
    }
}