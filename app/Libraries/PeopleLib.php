<?php

namespace App\Libraries;

use Illuminate\Http\Request;

use Google_Client;
use Google_Service_PeopleService;

use App\Libraries\_Cache;
use App\Libraries\PeopleDB;


class PeopleLib
{
    
    public $client, $service, $person_array;
    public $protocol = 'http';
    public $host = '127.0.0.1';
    public $port = '8000';
    public $redirect_resource = 'people/redirect';
    public $caches = ['gpclient', 'auth_complete', 'auth_error', 'error_msg'];
    
    public function __contruct() {

        $this->middleware('auth');

    }

    public function setClient() 
    {
        // Flush out previously cached values.
        _Cache::flushCache($this->caches);

        // Get the client.
        $this->client = $this->getClient();
        
        // Returns ready to use people instance with access token set.
        if ($this->setTokenToClient())
        {
            return $this->client;
        }

        // Store client to use if redirected for authorization.
        $this->cacheClient();
        
        return false;
    }

    public function getClient() 
    {
        $client = new Google_Client();

        // Client setup
        $client->setApplicationName('Google People Alternative');
        $client->setScopes(Google_Service_PeopleService::CONTACTS, Google_Service_PeopleService::USERINFO_PROFILE);
        $credentials = PeopleDB::getApiCredentials();
        $client->setClientId($credentials['client_id']);
        $client->setClientSecret($credentials['client_secret']);
        $client->setAccessType("offline");
        $client->setPrompt('select_account consent');
        $client->setRedirectUri($this->protocol . '://' 
                                . $this->host . ':' 
                                . $this->port . '/' 
                                . $this->redirect_resource);
        return $client;
    }

    public function cacheClient() 
    {
        _Cache::update('gpclient', $this->client);
    }    

    public function setTokenToClient() 
    {
        $access_token = PeopleDB::getAccessToken();
        if ($access_token) {
            $this->client->setAccessToken($access_token);

            // Check if token is valid
            if ($this->client->isAccessTokenExpired()) {

                // Check if token refresh possible
                if ($this->client->getRefreshToken()) {
                    $refresh_token = $this->client->getRefreshToken();
                    $this->client->fetchAccessTokenWithRefreshToken($refresh_token);

                    // Token is refreshed and set.
                    $this->authSuccess();
                    return true;
                }
                // Token cannot be refreshed. New token needed.
                return false;
            }
            $this->authSuccess();
            // Token has not expired, hence, usable.
            return true;
        }
        // No token found.
        return false;    
    }


    public function generateAuthUrl() 
    {
        // Stores the client in cache before redirect.
        $this->cacheClient();
        
        return $this->generateAuthCode();
    }

    public function generateAuthCode() 
    {
        return $this->client->createAuthUrl();
    }

    public function authorizeWithAuthCode($authcode) 
    {
        // Checks if the client persists.
        if (!$this->client = _Cache::hasKey('gpclient')) {
            $this->authError('GP Client object missing');
            return false;
        }
       
        $access_token = $this->client->fetchAccessTokenWithAuthCode($authcode);

        // Check for error in access token.
        if (array_key_exists('error', $access_token)) {
            $this->authError('Token has errors');
            return false;
        }
        
        // Set token to client.
        $this->client->setAccessToken($access_token);

        // Save the token to db.
        $this->saveToken(json_encode($access_token));

        // Conclude authoization process.
        $this->authSuccess();
        return true;
    }

    public function saveToken($token) 
    {
        PeopleDB::setAccessToken($token);
    }

    public function authSuccess()
    {
        // This update the /people view with success.
        _Cache::update('auth_complete', true);

        // Finally flush the cache.
        // _Cache::flushCache($this->caches);
    }
    
    public function authError($error) 
    {
        // This update the /people view with error.
        _Cache::update('auth_error', true);
        _Cache::addNew('error_msg', $error);
    }
}
