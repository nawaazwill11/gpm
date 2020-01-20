<?php

namespace App\Libraries;

use App\ApiCredential;

use App\AccessToken, App\ApiCredentials, App\Users;

class PeopleDB
{
    public static function getApiCredentials() 
    {   
        $api_credentidenial = new ApiCredential;
        $row = $api_credentidenial::where('id', 1)->first();
        return json_decode($row->credential, true)['web'];
    }

    public static function getAccessToken()
    {
        $user_id = auth()->user()->id; // Get current user's
        $access_token = new AccessToken;
        $token = $access_token::where('user_id', $user_id)->first();
        // Check if token exists in table.
        if ($token) {
            return $token->token;
        }
        return false;
    }

    public static function setAccessToken($token)
    {
        $user_id = auth()->user()->id;
        $access_token = new AccessToken;
        $access_token::updateOrCreate(
            ['user_id' => $user_id], 
            ['token' => $token]
        );
    }
}