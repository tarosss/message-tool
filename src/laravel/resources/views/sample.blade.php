<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite(['resources/js/app.ts', 'resources/scss/app.scss', 'resources/scss/header.scss'])
</head>
<body>
    <div class="wrapper">
        <div id="app">
            <!-- @yield('App') -->
            <route></route>
        </div>
        <div class="modals">
            <div class="sub-modals"></div>
        </div>
    </div>
</body>
</html>