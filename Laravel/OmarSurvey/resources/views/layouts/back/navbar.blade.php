<nav class="main-header navbar navbar-expand navbar-dark navbar-success">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="{{ url('dashboard') }}" class="nav-link">{{ ucfirst( __('word.dashboard')) }}</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="{{ url('category') }}" class="nav-link">{{ ucfirst( __('word.category')) }}</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="{{ url('point') }}" class="nav-link">{{ ucfirst( __('word.point')) }}</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="{{ url('survey') }}" class="nav-link">{{ ucfirst( __('word.survey')) }}</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="{{ url('result') }}" class="nav-link">{{ ucfirst( __('word.result')) }}</a>
        </li>
    </ul>

    <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link btn btn-danger" href="{{ url('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">{{strtoupper(__('word.sign_out'))}} <i class="fas fa-lock"></i></a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </li>
    </ul>
</nav>