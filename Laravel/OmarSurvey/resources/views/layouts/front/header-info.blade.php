<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="Dynamic Attribute Product" />
<meta name="description" content="Product With Dynamic Attribute">
<meta name="author" content="RedHat">
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Tell the browser to be responsive to screen width -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>@yield('title', __('word.title'))</title>

<!-- Favicon -->
<link rel="icon" href="{{ asset('img/icon.png') }}" type="image/png" />
<link rel="shortcut icon" href="{{ asset('img/icon.png') }}" type="image/png" />
<link rel="apple-touch-icon" href="{{ asset('img/icon.png') }}">

<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

<!-- Ionicons -->
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

<!-- Google Font: Source Sans Pro -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700">

<!-- Font Awesome -->
<link rel="stylesheet" href="{{ asset('adminlte/plugins/fontawesome-free/css/all.min.css') }}">

<!-- Tempusdominus Bbootstrap 4 -->
<link rel="stylesheet" href="{{ asset('adminlte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">

<!-- iCheck -->
<link rel="stylesheet" href="{{ asset('adminlte/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">

<!-- SweetAlert2 -->
<link rel="stylesheet" href="{{ asset('adminlte/plugins/sweetalert2/sweetalert2.min.css') }}">

<!-- Toastr -->
<link rel="stylesheet" href="{{ asset('adminlte/plugins/toastr/toastr.min.css') }}">

<!-- Theme style -->
<link rel="stylesheet" href="{{ asset('adminlte/dist/css/adminlte.min.css') }}">

<!-- overlayScrollbars -->
<link rel="stylesheet" href="{{ asset('adminlte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">

<!-- Theme style -->
<link rel="stylesheet" href="{{ asset('css/global.css') }}">

<link rel="stylesheet" href="{{ asset('library/jajaxloader/skin/jajaxloader.css') }}">
<link rel="stylesheet" href="{{ asset('library/jajaxloader/skin/lukehaas/circle_on_path.css') }}">

<!-- Current Page CSS -->
@stack('page_css')