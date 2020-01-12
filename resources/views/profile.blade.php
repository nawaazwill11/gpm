@extends('layouts.common')

@section('title')
    People - Profile
@endsection

@section('css-assets')
{{-- css addon --}}
@endsection

@section('content')
<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
@endsection

@section('js-assets')
<script>
var elem= document.querySelector('.modal');
console.log(typeof(elem));
var instance = M.Modal.init(elem);
instance.open(elem);

</script>
@endsection