<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('/favicon.png', true) }}">
    <title>RunCheck</title>
    <script defer src="{{ asset('/spa/js/chunk-vendors.js?v='.time(), true) }}"></script>
    <script defer src="{{ asset('/spa/js/app.js?v='.time(), true) }}"></script>
    
  </head>
  <body style="background: rgb(243, 244, 246);">
    <noscript>
      <strong>We're sorry but hello-world doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
  </body>
</html>
