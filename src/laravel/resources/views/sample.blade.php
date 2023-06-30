<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite(['resources/js/app.ts', 'resources/scss/app.scss', 'resources/scss/sample.scss'])
</head>
<body>
    <div id="app">
        <!-- @yield('App') -->
        <route></route>
    </div>
    <!-- <script src="js/app.ts"></script> -->
    <!-- <app-blog-post></app-blog-post> -->
    <div class="modals">
        <div class="sub-modals"></div>
    </div>
    <script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossorigin="anonymous"></script>
</body>
</html>