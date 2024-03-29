<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite(['resources/js/app.ts', 'resources/scss/app.scss', 'resources/scss/header.scss', 'resources/scss/left-nav.scss', 'resources/scss/body.scss', 'resources/scss/channel.scss', 'resources/scss/message.scss', 'resources/scss/reaction.scss', 'resources/scss/file.scss', 'resources/scss/profile.scss'])
    <style></style>
</head>
<body>
    <div class="wrapper">
        <div id="app">
            <!-- @yield('App') -->
            <route 
                :logging-user-id="'{{$userId}}'"
                :token="'{{$token}}'"></route>
        </div>
        <div class="modals">
            <div class="sub-modals"></div>
        </div>
    </div>
</body>
</html>