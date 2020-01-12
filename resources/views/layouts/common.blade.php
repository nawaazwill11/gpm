<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'People')</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/materialize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/common.css') }}">
   @yield('css-assets')
</head>
<body>
    <nav>
        <div class="nav-wrapper">
          <a href="/" class="brand-logo tooltipped" data-position="bottom" data-tooltip="Google People Alternative">GPA</a>
          <a href="#" data-target="mobile-view" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="/">Home</a></li>
            <li><a href="profile">Profile</a></li>
            <li><a href="about">About</a></li>
          </ul>
        </div>
    </nav>
    
    <ul class="sidenav" id="mobile-view">
      <li><a href="/">Home</a></li>
      <li><a href="profile">Profile</a></li>
      <li><a href="about">About</a></li>
    </ul>
    

    @yield('content')
      
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
      crossorigin="anonymous"></script>
    <script type="text/javascript" src="{{ asset('js/materialize.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/common.js') }}"></script>
    @yield('js-assets')
</body>
</html>