@extends('layouts.common')

@section('title')
    People - Home
@endsection

@section('css-assets')
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
            <span class="alpha-name">A</span>
            <span class="contact-count">(1)</span>
        </div>
        <div class="divider"></div>
        <div class="card-container">
            <div class="row">
                <div id="0" class="col x12 s12 m6 l4 xl3 card-parent"> 
                    <div class="card-panel hoverable contact-card">
                        <div class="card-image">
                            <div class="icon-container">
                                <img src="{{ asset('img/office.jpg') }}" alt="icon">
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="contact-name">
                                <span class="truncate">ARabindranath Tagore</span>
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
                            <div class="close red">
                                <i class="material-icons prefix tooltipped-s" data-position="top" data-tooltip="Collapse">clear</i>
                            </div>
                            <div class="fixed-action-btn toolbar menu">
                                <a class="btn-floating red">
                                  <i class="material-icons">menu</i>
                                </a>
                                <ul>
                                    <li class="tooltipped menu-item item_edit" data-position="bottom" data-tooltip="Edit" data-itemname="item_edit">
                                        <a class="btn-floating">
                                            <i class="material-icons">edit</i>
                                        </a>
                                    </li>
                                    <li class="tooltipped menu-item item_delete" data-position="bottom" data-tooltip="Delete"
                                    data-itemname="item_delete">
                                        <a class="btn-floating">
                                            <i class="material-icons">delete</i>
                                        </a>
                                    </li>
                                    <li class="tooltipped menu-item item_download" data-position="bottom" data-tooltip="Download"
                                    data-itemname="item_download">
                                        <a class="btn-floating">
                                            <i class="material-icons">file_download</i>
                                        </a>
                                    </li>
                                    <li class="tooltipped menu-item item_info" data-position="bottom" data-tooltip="More"
                                    data-itemname="item_info">
                                        <a class="btn-floating">
                                            <i class="material-icons">info</i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- <div class="container _e_container">
    <div class="card-panel hoverable">
        <div class="row">
            <div class=" col xs12 s10 m8 l6 xl4">
                <form>
                    <div class="row">
                        <div class="col xs12 _e_image-container">
                            <img src="/img/office.jpg">
                        </div>
                        <div class="image-controls">
                            <div>
                                <button>Change</button>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="_" type="email" class="validate">
                            <label for="email" class="">Email</label>
                            <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
                        </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div> --}}
{{-- <div class="container _e_container">
    <div></div>
    <div class="row">
        <div class="flexbox">
            <div class="z-depth-3 _e_panel">
                <div class="_e_content">
                    <div class="fixed-content">
                        <div class="_e_layer">
                            <div class="_e_image-container">
                                <div class="_e_image">
                                    <img src="/img/office.jpg" alt="">
                                </div>
                            </div>
                            <div class="_e_image-controls">
                                <a class="waves-effect waves-light btn change">Change</a>
                                <a class="waves-effect waves-light btn remove">Remove</a>
                            </div>
                        </div>
                    </div>
                    <div class="variable-content">
                        <div class="variables">
                            <div class="_e_layer name">
                                <div class="row">
                                    <div class="name-box">
                                        <div class="firstname col s12 l6">
                                            <div class="input-field">
                                                <input id="firstname" type="text" value="Rabindranath">
                                                <label for="firstname">First Name</label>
                                                <span class="helper-text" data-error="Invalid" data-success="right"></span>
                                            </div>
                                        </div>
                                        <div class="lastname  col s12 l6">
                                            <div class="input-field">
                                                <input id="lastname" type="text" value="Tagore">
                                                <label for="email">Last Name</label>
                                                <span class="helper-text" data-error="Invalid" data-success="right"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="_e_layer phone">
                                <div class="row">
                                    <div class="field-box">
                                        <div class="side-icon">
                                            <i class="material-icons right waves-effect">remove_circle</i>
                                        </div>
                                        <div class="input-field">
                                            <input id="phone-1" type="text" value="+919737177329">
                                            <label for="phone-1">Phone number</label>
                                        </div>
                                    </div>
                                    <div class="field-box">
                                        <div class="side-icon">
                                            <i class="material-icons right waves-effect">remove_circle</i>
                                        </div>
                                        <div class="input-field">
                                            <input id="phone-2" type="text" value="+919558484794">
                                            <label for="email">Phone number</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom-icon">
                                    <i class="material-icons small waves-effect">add_circle</i>
                                </div>
                            </div>
                            <div class="_e_layer phone">
                                <div class="row">
                                    <div class="field-box">
                                        <div class="side-icon">
                                            <i class="material-icons right waves-effect">remove_circle</i>
                                        </div>
                                        <div class="input-field">
                                            <input id="email" type="email" class="validate" value="mastermindjim@gmai.com">
                                            <label for="email">Email</label>
                                            <span class="helper-text" data-error="Invalid" data-success="right"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom-icon">
                                    <i class="material-icons small waves-effect">add_circle</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="_e_controls">
                    <a class="waves-effect waves-teal btn undo">Undo <i class="material-icons right">undo</i></a>
                    <a class="waves-effect waves-teal btn send">Send <i class="material-icons right">send</i></a>
                </div>
            </div>
        </div>
    </div>
    <div></div>
</div> --}}

{{-- 
<div class="container econtainer">
    <div class="epanel z-depth-2">
        <div class="econtent">
            <form id="eform" class="eform">
                <div class="efixed-content">
                    <div class="econtent-layer">
                        <div class="eimage-container">
                            <div class="eimage">
                                <span>R</span>
                            </div>
                        </div>
                        <div class="eimage-controls">
                            <a class="waves-effect waves-light btn econtrols change">Change</a>
                            <a class="waves-effect waves-light btn econtrols remove">Remove</a>
                        </div>
                    </div>
                </div>
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
                <div class="evariable-content">
                    <div class="segment noadd" data-type="name">
                        <div class="seg-title">
                            <span class="title">
                                <i class="material-icons small waves-effect">person_outline</i>
                                Name
                            </span>
                        </div>
                        <div class="divider"></div>
                        <div class="econtent-layer">
                            <div class="fieldbox">
                                <div class="input-field noop">
                                    <input id="firstname_1" type="text" value="Rabindranath">
                                    <label for="firstname_1">First Name</label>
                                </div>
                                <div class="side-icon delete-icon">
                                    <i class="material-icons waves-effect">remove_circle</i>
                                </div>
                            </div>
                        </div>
                        <div class="econtent-layer">
                            <div class="fieldbox">
                                <div class="input-field noop">
                                    <input id="lastname_1" type="text" value="Tagore">
                                    <label for="lastname_1">Last Name</label>
                                </div>
                                <div class="side-icon delete-icon">
                                    <i class="material-icons waves-effect">remove_circle</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="segment" data-type="phone">
                        <div class="seg-title">
                            <span class="title">
                                <i class="material-icons small waves-effect ">phone</i>
                                Phone
                            </span>
                        </div>
                        <div class="divider"></div>
                        <div class="bottom-icon">
                            <div class="adder">
                                <i class="material-icons small waves-effect">add_circle</i>
                            </div>
                        </div>
                        <div class="econtent-layer"  data-series='1'>
                            <div class="fieldbox">
                                <div class="input-field">
                                    <input id="phone_1" type="text" value="+919737177329">
                                    <label for="phone_1">Phone number</label>
                                </div>
                                <div class="side-icon delete-icon">
                                    <i class="material-icons waves-effect">remove_circle</i>
                                </div>
                            </div>
                        </div>
                        <div class="econtent-layer"  data-series='2'>
                            <div class="fieldbox">
                                <div class="input-field">
                                    <input id="phone-2" type="text" value="+919558484794" data-layer="2">
                                    <label for="email">Phone number</label>
                                </div>
                                <div class="side-icon delete-icon">
                                    <i class="material-icons waves-effect">remove_circle</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="segment" data-type="mail">
                        <div class="seg-title">
                            <span class="title">
                                <i class="material-icons small waves-effect ">mail_outline</i>
                                Mail
                            </span>
                        </div>
                        <div class="divider"></div>
                        <div class="bottom-icon">
                            <div class="adder">
                                <i class="material-icons small waves-effect">add_circle</i>
                            </div>
                        </div>
                        <div class="econtent-layer">
                            <div class="fieldbox">
                                <div class="input-field low-marg">
                                    <input id="email_1" type="email" class="validate" value="mastermindjim@gmai.com">
                                    <label for="email_1">Email Address</label>
                                    <span class="helper-text" data-error="Invalid" data-success="right"></span>
                                </div>
                                <div class="side-icon delete-icon">
                                    <i class="material-icons waves-effect">remove_circle</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="eform-control">
                    <div class="fc-icon undo">
                        <a class="btn-floating waves-effect red tooltipped" data-tooltip="Undo changes" data-position="left"><i class="material-icons">undo</i></a>
                    </div>
                    <div class="fc-icon save">
                        <a class="btn-floating waves-effect red tooltipped" data-tooltip="Save changes" data-position="right"><i class="material-icons">save</i></a>
                    </div>
                </div>
            </form>
        </div>
        <div class="eclose">
            <i class="material-icons red">close</i>
        </div>
    </div>
</div> --}}


@endsection

@section('js-assets')
<script type="text/javascript" src="{{ asset('js/index.js') }}"></script>
@endsection