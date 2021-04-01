@extends('layouts.front')

@push('page_content')

<div class="bg-strategic-thank">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 py-3 text-center">
                <img class="d-none d-sm-none d-md-none d-lg-inline" src="{{ url('img/logo/logo_lg.png') }}"/>
                <img class="d-lg-none d-xl-none d-md-inline" src="{{ url('img/logo/logo_sm.png') }}"/>
            </div>
        </div>

        <div class="row">
            <div class="offset-1 col-10 text-center">
                <a href="{{ url('/index') }}" role="button" class="btn btn-link">Index</a>
                <span>|</span>
                <a href="{{ url('/ebook/download') }}" role="button" class="btn btn-link">EBook Download</a>
                <span>|</span>
                <a href="{{ url('/ebook/thank') }}" role="button" class="btn btn-link">EBook Thank</a>
                <span>|</span>
                <a href="{{ url('/strategic/request') }}" role="button" class="btn btn-link">Strategic Request</a>
                <span>|</span>
                <a href="{{ url('/strategic/thank') }}" role="button" class="btn btn-link">Strategic Thank</a>
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-1 col-lg-5 p-5 offset-1 col-10 mt-5">
                <h2 class="font-weight-bold my-5">Thank you for registering for your free personalized strategic session.</h2>
                <h2 class="font-weight-bold">Our awesome team will check your social presence and contact you to optimize it!</h2>
            </div>
            <div class="offset-lg-0 col-lg-5 offset-1 col-10 mt-5">
                <img class="img-fluid" src="{{ url('img/items/undraw_super_thank_you_obwk.png') }}"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="d-none d-sm-none d-md-none d-lg-inline" style="line-height: 30px">
                    &nbsp;
                </div>
            </div>
        </div>

        <div class="row">
            <div class="offset-1 col-10 text-center">
                <a href="{{ url('/index') }}" role="button" class="btn btn-link">Index</a>
                <span>|</span>
                <a href="{{ url('/ebook/download') }}" role="button" class="btn btn-link">EBook Download</a>
                <span>|</span>
                <a href="{{ url('/ebook/thank') }}" role="button" class="btn btn-link">EBook Thank</a>
                <span>|</span>
                <a href="{{ url('/strategic/request') }}" role="button" class="btn btn-link">Strategic Request</a>
                <span>|</span>
                <a href="{{ url('/strategic/thank') }}" role="button" class="btn btn-link">Strategic Thank</a>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-5">
                <p class="text-center">© 2019 Soltivo.com | All rights reserved.</p>
            </div>
        </div>
    </div>
</div>

@endpush