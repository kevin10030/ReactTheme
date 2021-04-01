<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>

    @include('layouts.front.header-info')

</head>
<body>

    <!-- Global Page Header -->
    @include('layouts.front.header')

    <!-- Current Page Content -->
    @stack('page_content')

    <!-- Global Page Footer -->
    @include('layouts.front.footer')

</body>

@include('layouts.front.footer-info')

</html>