<?php

namespace App\Libraries;

class ContactParser
{
    public static function parse($raw) 
    {
        $contacts = [];
        if (!count($raw->getConnections()) == 0) {
            foreach ($raw->getConnections() as $person) {
                $icon = '';
                $name = '';
                $email = [];
                $phone = [];
                $email = [];

                if (count($person->getPhotos()) != 0) 
                {
                    $icon = $person->getPhotos()[0]->getUrl();
                }

                if (count($person->getNames()) != 0) 
                {
                    $name = $person->getNames()[0]->getDisplayName();
                }
                if (count($person->getPhoneNumbers()) != 0) 
                {
                    foreach($person->getPhoneNumbers() as $_phone)
                    {
                        array_push($phone, $_phone->getValue());
                    }
                    
                }
                if(count($person->getEmailAddresses()) != 0) 
                {
                    foreach($person->getEmailAddresses() as $_email)
                    {
                        // dd($_email->getValue());
                        array_push($email, $_email->getValue());
                    }
                }
                $contact = array(
                    'icon' => $icon,
                    'name' => $name,
                    'contact' => array(
                        'phone' => $phone,
                        'email' => $email
                    )
                );
                array_push($contacts, $contact);
            }
        }
        
        return $contacts;
    }
}