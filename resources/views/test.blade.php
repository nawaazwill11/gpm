<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/materialize.css') }}">
</head>
<body>
    <div class="container">
        <div class="row">
            
            
            <div class="fixed-action-btn toolbar">
                <a class="btn-floating btn-large red">
                    <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><a class="btn-floating"><i class="material-icons">insert_chart</i></a></li>
                    <li><a class="btn-floating"><i class="material-icons">format_quote</i></a></li>
                    <li><a class="btn-floating"><i class="material-icons">publish</i></a></li>
                    <li><a class="btn-floating"><i class="material-icons">attach_file</i></a></li>
                </ul>
            </div>
        </div>
    </div>
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
      crossorigin="anonymous"></script>
    <script type="text/javascript" src="{{ asset('js/materialize.js') }}"></script>
    <script>
        $(document).ready(function(){
        $('.fixed-action-btn').floatingActionButton({
            toolbarEnabled: true
        });
    });
    </script>
</body>
</html>