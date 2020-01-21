<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ApiCredential extends Model
{
    protected $table = 'api_credential';

    protected $fillable = ['id', 'credential'];
}
