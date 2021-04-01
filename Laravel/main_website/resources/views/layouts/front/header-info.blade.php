<!-- Basic -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="soltivo" />
<meta name="description" content="soltivo">
<meta name="author" content="Benjamin">
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Mobile Metas -->
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">

<!-- Title -->
<title>{{ __('word.title') }}</title>

<!-- Favicon -->
<link rel="shortcut icon" href="{{ asset('img/icon/favicon.png') }}" type="image/x-icon" />
<link rel="apple-touch-icon" href="{{ asset('img/icon/icon_lg.png') }}">

<!-- Web Fonts  -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800%7CShadows+Into+Light" rel="stylesheet" type="text/css">

<!-- Global CSS -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/bootstrap-4.3.1/css/bootstrap.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/global.css') }}">

<!-- Current Page CSS -->
@stack('page_css')