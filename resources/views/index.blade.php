@extends('layouts.common')

@section('title')
    People - Home
@endsection

@section('css-assets')
<link rel="stylesheet" href="{{ asset('css/index.css') }}">
@endsection

@section('content')

<div class="container">
    <div class="search-panel">
        <div class="row">
            <form class="col xs12 search">
            <div class="input-field col xs12">
                <i class="material-icons prefix">search</i>
                <textarea id="contact_search" class="materialize-textarea search-autocomplete"></textarea>
                <label for="contact_search">Search</label>
            </div>
            </form>
        </div>
    </div>
</div>
<div class="contact-container">
    <div class="alphabet-level">
        <div class="alphabet">
            <span>A</span>
        </div>
        <div class="divider"></div>
        <div class="card-container">
            <div class="row">
                {{-- <div class="col x12 s12 m6 l4 xl3 card-parent"> 
                    <div class="card-panel hoverable contact-card">
                        <div class="card-image">
                            <img src="{{ asset('img/office.jpg') }}" alt="icon">
                        </div>
                        <div class="card-content">
                            <div class="contact-name">
                                <span class="truncate">Rabindranath Tagore</span>
                            </div>
                            <div class="infograph">
                                <div class="info_g">
                                    <i class="material-icons prefix icon">phone</i>
                                    <span class="phone-count">
                                        2  
                                    </span>
                                </div>
                                <div class="info_g">
                                    <i class="material-icons prefix icon">mail_outline</i>
                                    <span class="mail-count">
                                        1
                                    </span>
                                </div>
                            </div>
                            <div class="contact-details">
                                <div class="contact-content">
                                    <div class="info">
                                        <i class="material-icons prefix icon">phone</i>
                                        <span class="phone contact">
                                            +919737177329
                                        </span>
                                    </div>
                                    <div class="info">
                                        <i class="material-icons prefix icon">phone</i>
                                        <span class="phone contact">
                                            +919737177329
                                        </span>
                                    </div>
                                </div>
                                <div class="contact-content">
                                    <div class="info">
                                        <i class="material-icons prefix icon">mail_outline</i>
                                        <span class="mail contact">
                                            mastermindjim@gmail.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="close">
                                <i class="material-icons prefix tooltipped-s" data-position="top" data-tooltip="Collapse">clear</i>
                            </div>
                        </div>
                    </div>
                </div> --}}
            </div>
        </div>
    </div>
</div>


@endsection

@section('js-assets')
<script type="text/javascript" src="{{ asset('js/index.js') }}"></script>
@endsection