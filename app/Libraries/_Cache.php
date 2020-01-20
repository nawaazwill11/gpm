<?php

namespace App\Libraries;

use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class _Cache 
{
    public static function carbonMinutes($minutes=5) 
    {
        return Carbon::now()->addMinutes($minutes);
    }

    public static function addNew($key, $value, $minutes=5) 
    {
        if(Cache::has($key))
        {
            Cache::forget($key);
        }

        $expiresAt = _Cache::carbonMinutes($minutes);
        Cache::add($key, $value, $expiresAt);
        return true;
    }

    public static function update($key, $value, $minutes=5) 
    {
        Cache::put($key, $value, _Cache::carbonMinutes($minutes));
    }

    public static function get($key, $default=false) 
    {
        return Cache::get($key, $default);
    }

    public static function hasKey($key)
    {
        if (Cache::has($key))
        {
            return Cache::get($key);
        }
        return false;
    }

    public static function replaceName($key, $newKey, $minutes=5) 
    {
        $value = Cache::get($key, false);
        if ($value) 
        {
            Cache::add($newKey, $value, _Cache::carbonMinutes($minutes));
            Cache::forget($key);
            
            return true;
        }
        return false;
    }

    public static function remove($key)
    {
        if(Cache::has($key))
        {
            Cache::forget($key);
        }
        
        return true;
    }

    public static function flushCache($values) 
    {
        $type = gettype($values);
        if ($type == 'string')
        {
            Cache::forget($values);
        }
        else if ($type == 'array') 
        {
            foreach ($values as $value)
            {
                Cache::forget($value);
            }
        }
    }
}
