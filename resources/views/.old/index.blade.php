@extends('layouts.common')

@section('title')
    People - Home
@endsection

@section('css-assets')
<link rel="stylesheet" href="{{ asset('css/index.css') }}">
@endsection

@section('content')
<div class="row">
    <form class="col xs12 search">
      <div class="input-field col xs12 m10 l8">
        <i class="material-icons prefix">search</i>
        <textarea id="contact_search" class="materialize-textarea search-autocomplete"></textarea>
        <label for="contact_search">Search</label>
      </div>
    </form>
</div>
<div class="divider"></div>
<div class="row">
  {{-- <div class="col xs12 s12 m6 l4 xl4 collapse">
    <div class="hoverable underlay">
      <ul class="collapsible popout">
        <li>
          <div class="collapsible-header" tabindex="0">
            <div class="card-image">
              <img src="http://127.0.0.1:8000/img/office.jpg">
            </div>
            <div class="card-content">
              <div class="contact-name">
                <span class="truncate">Ranbindranath Tagore Tagore Tagore</span>
              </div>
              <div class="contact-details">
                <div class="infograph">
                  <i class="material-icons">call</i>
                  <span class="info">2</span>
                </div>
                <div class="infograph">
                  <i class="material-icons">mail_outline</i>
                  <span class="info">1</span>
                </div>
              </div>
              <a class="btn-floating btn-small halfway-fab waves-effect waves-light red"><i class="material-icons">info_outline</i></a>
            </div>
          </div>
          <div class="collapsible-body">
            <span>+91737177329</span>
            <span>+919558484794</span>
            <span>mastermindjim@gmail.com</span>
          </div>
        </li>
      </ul>
    </div>
  </div> --}}
  {{-- <div class="col s12 m6 l4 xl4 search">
    <div class="card">
      <div class="roww">
        <div class="card-image">
          <img src="http://127.0.0.1:8000/img/office.jpg">
        </div>
      </div>
      <div class="card-content">
        <p><b>Ayush Singh</b></p>
        <p>+91 97371 77329</p>
        <p>anemailaddress@gmail.com</p>
        <p class="truncate">anotheremailaddress@gmail.com</p>
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">info_outline</i></a>
      </div>
    </div>
  </div> --}}
  <div class="col xs12 s12 m6 l4 xl4 _card">
    <div class="card card-panel hoverable collapse">
      <div class="card-image">
        <img src="http://127.0.0.1:8000/img/office.jpg">
      </div>
      <div class="card-content">
        <div class="contact-name">
          <b class="truncate">Ranbindranath Tagore</b>
        </div>
        <div class="contact-details">
          <div class="infograph">
            <i class="material-icons">call</i>
            <span class="info">2</span>
          </div>
          <div class="infograph">
            <i class="material-icons">mail_outline</i>
            <span class="info">1</span>
          </div>
        </div>
        <a class="btn-floating btn-small halfway-fab waves-effect waves-light red"><i class="material-icons">info_outline</i></a>
      </div>
    </div>
  </div>
  <div class="col xs12 s12 m6 l4 xl3 _card">
    <div class="card card-panel hoverable collapse">
      <div class="card-image">
        <img src="http://127.0.0.1:8000/img/office.jpg">
      </div>
        <div class="card-content">
            <div class="contact-name">
              <b class="truncate">Ranbindranath Tagore</b>
            </div>
            <div class="contact-details">
                <div class="trail">
                    <div class="infograph">call</i>
                        <span class="info">2</span>
                    </div>
                    <div class="infograph">mail_outline</i>
                        <span class="info">1</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="detailed">
                    <div class="phone contact-content">
                    <div class="contact">
                            <i class="material-icons">call</i>
                            <span>+919737177329</span>
                        </div>
                        <div class="contact">
                            <i class="material-icons">call</i>
                            <span>+919558484794</span>
                        </div>
                    </div>
                    <div class="mail contact-content">
                        <div class="contact">
                            <i class="material-icons">mail_outline</i>
                            <span>mastermindjim@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <a class="btn-floating btn-small halfway-fab waves-effect waves-light red"><i class="material-icons">info_outline</i></a>
        </div>
    </div>
  </div>
</div>
<div class="row cc">
  <div class="col l4 collapse">
    <ul class="collapsible">
      <li>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
        <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
        <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
        <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      </li>
    </ul>
  </div>
  
</div>

@endsection

@section('js-assets')
<script type="text/javascript" src="{{ asset('js/index.js') }}"></script>
@endsection