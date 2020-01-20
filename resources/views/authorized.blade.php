@extends('layouts.common')

@section('title')
Authorization - 
    @if ($success)
        Complete
    @else
        Failed
    @endif
@endsection

@section('css-assets')
{{-- css addon --}}
@endsection

@section('content')
<div class="container">
    <div class="row">
        <div class="flexbox">
            <div class="col x12">
                <div class="info">
                    @if ($success)
                        <h1 id="success">YOU HAVE SUCCESSFULLY AUTHORIZED  GPA WITH YOU GOOGLE ACCOUNT.</h1>
                        <br>
                        <h2>THIS WINDOW WILL NOW CLOSE.</h2>
                    @else
                        <h1>UNFORTUNATELY, WE COULDN'T AUTHOZIED GPA WITH YOU GOOGLE ACCOUNT.</h1>
                        <div class="redirect">
                            <button class="btn">Back To Home</button>
                        </div>
                        <div class="redirect">
                            <button class="btn">Retry Authorization</button>
                        </div>
                    @endif
                </div>
               
            </div>
        </div>
    </div>
</div>
@endsection

@section('js-assets')
<script>
    window.onload = function() {
        if (document.querySelector('.info #success')) {
            setTimeout(function () {
                window.close();
            }, 3000)
        }
    }
</script>
@endsection