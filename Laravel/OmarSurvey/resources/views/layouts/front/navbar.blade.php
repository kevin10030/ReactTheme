<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-dark navbar-success">
    <div class="container">
        <a href="{{ url('/home') }}" class="navbar-brand">
            <img src="{{ url('img/logo.png') }}" alt="{{__('word.site_name')}}" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-bolder">{{__('word.site_name')}}</span>
        </a>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                @if (Auth::check())
                    <a class="nav-link btn btn-success" href="{{ url('dashboard') }}">
                        <i class="fas fa-home"></i>
                    </a>
                @else
                    <a class="nav-link btn btn-success" href="{{ url('login') }}">
                        <i class="fas fa-key"></i>
                    </a>
                @endif
            </li>
        </ul>
    </div>
</nav>
<!-- /.navbar -->