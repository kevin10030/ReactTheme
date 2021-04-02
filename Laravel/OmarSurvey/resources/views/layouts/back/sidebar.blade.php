<aside class="main-sidebar sidebar-light-success elevation-4">
    <!-- Brand Logo -->
    <a href="{{ url('home') }}" class="brand-link navbar-success">
        <img src="{{ url('img/logo.png') }}" alt="Site Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-bolder text-white">{{__('word.site_name')}}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                     with font-awesome or any other icon font library -->
                <li class="nav-item">
                    <a href="{{ url('dashboard') }}" class="nav-link @if( request()->is('/') || request()->is('dashboard') ) active @endif">
                        <i class="nav-icon fas fa-home"></i>
                        <p>{{ucfirst(__('word.dashboard'))}}</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('category') }}" class="nav-link @if( request()->is('category*') ) active @endif">
                        <i class="nav-icon fas fa-star-of-david"></i>
                        <p>{{ucfirst(__('word.category'))}}</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('point') }}" class="nav-link @if( request()->is('point*') ) active @endif">
                        <i class="nav-icon fas fa-star-half-alt"></i>
                        <p>{{ucfirst(__('word.point'))}}</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('survey') }}" class="nav-link @if( request()->is('survey*') && !request()->is('surveyor*') ) active @endif">
                        <i class="nav-icon fas fa-clipboard-list"></i>
                        <p>{{ucfirst(__('word.survey'))}}</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('result') }}" class="nav-link @if( request()->is('result*') ) active @endif">
                        <i class="nav-icon fas fa-poll"></i>
                        <p>{{ucfirst(__('word.result'))}}</p>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>