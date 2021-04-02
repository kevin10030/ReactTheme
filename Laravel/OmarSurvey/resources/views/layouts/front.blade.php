<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    @include('layouts.front.header-info')

</head>
<body class="hold-transition layout-top-nav">
<div class="wrapper">

    @include('layouts.front.navbar')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">

        <!-- Main content -->
        <div class="content">

            <!-- Current Page CSS -->
            @stack('page_content')

        </div>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    @include('layouts.front.footer')
</div>
<!-- ./wrapper -->

@include('layouts.front.footer-info')

</body>
</html>
