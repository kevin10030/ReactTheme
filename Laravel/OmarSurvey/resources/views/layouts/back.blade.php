<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    @include('layouts.back.header-info')

</head>
<body class="sidebar-mini sidebar-collapse">

<div class="wrapper">

    @include('layouts.back.navbar')

    @include('layouts.back.sidebar')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">

        @include('layouts.back.content-header')

        <!-- Main content -->
        <section class="content">

            <!-- Current Page CSS -->
            @stack('page_content')

        </section>
        <!-- /.content -->

    </div>
    <!-- /.content-wrapper -->

    @include('layouts.back.footer')

</div>
<!-- ./wrapper -->

    @include('layouts.back.footer-info')

</body>
</html>
