@extends('layouts.common')

@section('title')
Google People Authentication
@endsection

@section('css-assets')
<link rel="stylesheet" href="{{ asset('/css/gpauth.css') }}">
@endsection

@section('content')
<div class="container">
    <div class="z-depth-2 panel">
        <div class="content">
            <div class="content-title">
                <p>Authorize Google People</p>
            </div>
            <div class="divider"></div>
            <div class="content">
                <div class="content-layer">
                    <div class="authorize">
                        <a class="waves-effect waves-light btn">
                            <i class="material-icons">security</i>
                            <span>Authorize</span>
                        </a>
                    </div>
                </div>
                <div class="content-layer">
                    <div class="status">
                        <p>Status</p>
                        <div class="connection">
                            <div class="dot"></div>
                            <span>Offline</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js-assets')
{{-- js addon --}}
@endsection