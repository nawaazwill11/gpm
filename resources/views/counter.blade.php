<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul class="msgs"></ul>
    <script>
        let evtSource = new EventSource("counts", {withCredentials: true});
        let eventList = document.querySelector('.msgs');

        evtSource.onopen = function () {
            console.log('Connection to server opened');
        };

        evtSource.onmessage = function (e) {
           alert();
            console.log(e.data);
        };

    </script>
</body>
</html>