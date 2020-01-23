@extends('layouts.common')

@section('title')
Google People Authentication
@endsection

@section('css-assets')
<link rel="stylesheet" href="{{ asset('/css/gpauth.css') }}">
@endsection

@section('content')
<div class="container">
    <div class="row">
        <div class="flexbox">
            <div class="col s11 m8 l6 z-depth-2 panel">
                <div class="content">
                    <div class="content-layer">
                        <div class="content-title">
                            <p>Authorize With Google People</p>
                        </div>
                    </div>
                    <div class="content-layer ">
                        <div class="tip">
                            <p>To use GPA, you will need to allow GPA to access your Google account.<br>Please click the Authorize button below and follow the instruction on screen to complete the authorization process.</p>
                        </div>
                    </div>
                    <div class="content-layer">
                        <div class="authorize">
                            <a class="waves-effect waves-light btn">
                                <i class="material-icons">security</i>
                                <span>Authorize</span>
                            </a>
                            <div class="loader">
                                <div class="preloader-wrapper active">
                                    <div class="spinner-layer spinner-red-only">
                                      <div class="circle-clipper left">
                                        <div class="circle"></div>
                                      </div><div class="gap-patch">
                                        <div class="circle"></div>
                                      </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-layer">
                        <div class="status">
                            <div class="connection">
                                <div class="dot"></div>
                                <span>Offline</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s11 m8 l6 z-depth-2 panel">
                <div class="content">
                    <div class="content-layer">
                        <div class="content-title">
                            <p>Security</p>
                        </div>
                    </div>
                    <div class="content-layer">
                        <div class="form-inputs">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="old_password" type="password" class="validate">
                                    <label for="old_password">Old Password</label>
                                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="new_password" type="password" class="validate">
                                    <label for="new_password">New Password</label>
                                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="re_password" type="password" class="validate">
                                    <label for="re_password">Re-enter Password</label>
                                    <span class="helper-text" data-error="wrong" data-success="right" style="color:red"></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-controls">
                            <a id="submit" class="waves-effect waves-light btn btn-large red">Change</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
@endsection

@section('js-assets')
<script src="{{ asset('js/gpauth.js') }}"></script>
@endsection