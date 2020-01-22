@extends('layouts.common')

@section('title')
    People - Home
@endsection

@section('css-assets')
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="{{ asset('css/index.css') }}">
@endsection

@section('content')

<div class="loader">
    <div class="progress"><div class="indeterminate"></div></div>
</div>

<div class="container">
    <div class="search-panel">
        <div class="row">
            <form class="col xs12 search">
            <div class="input-field col xs12">
                <i class="material-icons prefix">search</i>
                <input type="text" id="contact-search" class="autocomplete">
                <label for="contact-search">Search contacts</label>
            </div>
            </form>
        </div>
    </div>
</div>

<div class="contact-container">
    <div class="blank-screen" style="display: none;flex-direction: column;align-items: center;color:#8e8c8c;">
        <div class="heading" style="text-align:center">
            <h1>You are not connected.</h1>
        </div>
        <div class="body" style="text-align:center">
            <h4>
                <p>
                    To connect, please visit your <b>Profile</b>
                </p>
                <p>
                    And click <b>Authorize</b>.
                </p>
            </h4>
        </div>
    </div>
</div>
@endsection

@section('js-assets')
<script type="text/javascript" src="{{ asset('js/index.js') }}"></script>
@endsection