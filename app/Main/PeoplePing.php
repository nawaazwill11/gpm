<?php

namespace App\Main;

use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Libraries\_Cache;

class PeoplePing 
{
    
    public function __contruct() 
    {
        // Indicates auth process success and failure.
        _Cache::update('auth_complete', false);
        _Cache::update('auth_error', false);
    }

    public function ping() 
    {
        $res = array('success' => false, 'error' => false);

        // Loop until client disconnects.
        // while (1) 
        // {
        // Check for updates in cache.
        if (_Cache::get('auth_complete') == true) {
            $res['success'] = true;
        } 
        else if (_Cache::get('auth_error') == true) {
            $res['error'] = array(
                    'error' => array (_Cache::get('error_msg', 'Unknown error occured')
            ));
        }

        // Response object for continuous response stream.
        $response = new StreamedResponse();

        // Executes on every new event request
        $response->setCallback(function () use ($res){
            // Send a string data stream with 'data' attribute
            echo 'data: '. json_encode($res) . "\n\n" ; // newline character is important.
            
            // ob_flush();
            
            // Flushes buffer as response to event stream.
            while (ob_get_level() > 0) {
                ob_end_flush();
            }

            // Removes data from buffer after above response.
            flush();
            
            // Latency between responses.
            sleep(1);
        });

        // break the loop when client aborts.
        // if ( connection_aborted() ) break;
            
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('Cach-Control', 'no-cache');
        $response->send();
        
    }

}
