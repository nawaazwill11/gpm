<?php

namespace App\Main;

use App\AccessToken;
use App\Libraries\PeopleLib;

class PeopleAuth 
{
    public function authorize()
    {
        // Contact api for client authorization.
        $people = new PeopleLib();
        
        // Create a response array.
        $response = array();

        // Client is set and valid.
        // No fresh authentication needed.
        if($people->setClient())
        {
            $response =  array(
                'fresh' => false
            );
        }
        // Get a new access token.
        else 
        {
            $authURL = $people->generateAuthUrl();
            $response = array (
                'fresh' => true,
                'url' => $authURL
            );
        }

        return $response;
    }

    public function reauth($request)
    {
        $people = new PeopleLib();
        $authCode = $request->code; // fetch the authcode
        $is_authorized = $people->authorizeWithAuthCode($authCode);
        return $is_authorized;
    }
}
