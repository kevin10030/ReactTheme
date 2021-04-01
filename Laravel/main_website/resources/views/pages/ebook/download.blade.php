@extends('layouts.front')

@push('page_content')

<div class="bg-ebook-download">
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
            <div class="offset-lg-2 col-lg-4 p-5 offset-1 col-10 mt-1">
                <img class="img-fluid" src="{{ url('img/items/undraw_reading_list_4boi.png') }}"/>
            </div>
            <div class="offset-lg-0 col-lg-4 offset-1 col-10 mt-1">
                <div class="w-100" style="line-height: 100px;">&nbsp;</div>
                <h4 class="font-weight-bold text-center">In which email should we send your free guide on social media?</h4>
                <div class="text-center w-100 my-3">
                    <input type="email" class="form-control form-control-lg w-75 m-auto border-radius-25px" placeholder="Your email"/>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-danger btn-lg px-5 bg-e53131 border-radius-25px">Get My FREE Guide</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-2 col-lg-8 offset-1 col-10 mt-5">
                <div class="img-card p-5">
                    <h2 class="font-weight-bold text-center">Why not Get a Free personalized strategic session?</h2>
                    <div class="w-100 text-center my-3">
                        <img class="img-fluid" src="{{ url('img/items/groupe_de_masques_3.png') }}"/>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-danger btn-lg px-5 bg-e53131 border-radius-25px">Request a FREE<br/>strategic session</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="d-none d-sm-none d-md-none d-lg-inline" style="line-height: 200px">
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