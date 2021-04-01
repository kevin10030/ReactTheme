<!-- Global JS -->
<script type="text/javascript" src="{{ asset('assets/jquery-3.4.1/jquery-3.4.1.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/popper-1.15.0/popper-1.15.0.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/bootstrap-4.3.1/js/bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('js/global.js')}}"></script>

<!-- Current Page Vendor and Views -->
@stack('page_js')

<!-- Stack JS -->
@stack('script')