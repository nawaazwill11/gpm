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

        // Create new Google People Client
        $people->setClient();

        // Set token (from DB) to he client.
        $is_set = $people->setTokenToClient();
        
        // Set up a response.
        $response = array (
            'fresh' => false
        );

        // If token wasn't set, generate a new one.
        if (!$is_set) {
            // Generate new token by access this URL.
            $authURL = $people->generateNewToken();

            $response = array (
                'fresh' => true,
                'url' => $authURL
            );
        }

        return json_encode($response);
    }

    public function reauth($request)
    {
        $people = new PeopleLib();
        $authCode = $request->code; // fetch the authcode
        $is_authorized = $people->authorizeWithAuthCode($authCode);
        return $is_authorized;
    }
}
