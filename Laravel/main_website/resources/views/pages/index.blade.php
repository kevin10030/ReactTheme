@extends('layouts.front')

@push('page_content')

<div class="bg-land">
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

        <div class="row my-5">
            <div class="col-12">
                &nbsp;
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-2 col-lg-4 p-5 offset-1 col-10 mt-1">
                <h1 class="font-weight-bold">Grow your brand awareness with social media.</h1>
                <p>
                    Count on us to provide the support and partnership required to delight your customers, achieve your goals and transform your business through social.
                </p>
                <div class="text-center">
                    <button type="button" class="btn btn-danger btn-lg px-5 bg-e53131 border-radius-25px">Get Started</button>
                </div>
            </div>
            <div class="col-lg-4 offset-1 col-10 mt-1">
                <img class="img-fluid" src="{{ url('img/items/undraw_social_strategy_1wuq.png') }}"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="d-none d-sm-none d-md-none d-lg-inline" style="line-height: 280px">
                    &nbsp;
                </div>
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-2 col-lg-3 offset-1 col-10 mt-5">
                <div class="img-card p-5">
                    <img class="img-fluid" src="{{ url('img/items/groupe_de_masques_1.png') }}"/>
                    <h4 class="font-weight-bold text-center">Build a stronger relationships with your customers</h4>
                    <p class="text-center">Using social media to build customer relationships is a must. Think about it for a second - social media is where your customers basically live these days.</p>
                    <div class="text-center">
                        <button type="button" class="btn btn-danger btn-lg px-5 bg-e53131 border-radius-25px">Get Started</button>
                    </div>
                </div>
            </div>
            <div class="offset-lg-2 col-lg-3 offset-1 col-10 mt-5">
                <div class="img-card p-5">
                    <img class="img-fluid" src="{{ url('img/items/groupe_de_masques_2.png') }}"/>
                    <h4 class="font-weight-bold text-center">Demonstrate your expertise in your industry</h4>
                    <p class="text-center">Before making a decision, customers do a quick search to browse your website and social media. Will they find an empty storefront or a rich source of information?</p>
                    <div class="text-center">
                        <button type="button" class="btn btn-danger btn-lg px-5 bg-e53131 border-radius-25px">Get Started</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="d-none d-sm-none d-md-none d-lg-inline" style="line-height: 50px">
                    &nbsp;
                </div>
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-0 col-lg-6 offset-0 col-12 p-0 mt-1">
                <img class="img-fluid" src="{{ url('img/items/text-bg.png') }}"/>
                <div class="position-absolute" style="top: 35%; left: 30%; right: 10%;">
                    <h2 class="color-ffffff">
                        Download our <span class="font-weight-bold">FREE Guide</span> to Help you Improve your Social media
                    </h2>
                </div>
            </div>
            <div class="col-lg-4 offset-1 col-10 mt-1 text-center align-middle p-1">
                <div class="position-absolute" style="top: 35%; left: 30%; right: 10%;">
                    <button type="button" class="btn btn-warning btn-lg px-5 bg-f6d426 border-radius-40px font-weight-bold" style="height: 100px;">Download Now</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-1 col-lg-5 offset-1 col-10 mt-5">
                <h1 class="color-000000 font-weight-bold">
                    What are you waiting for ? Boost your brand awareness on social media today!
                </h1>
                <div class="text-center">
                    <button type="button" class="btn btn-danger btn-lg bg-e53131 border-radius-25px px-5">Get Started</button>
                </div>
            </div>
            <div class="col-lg-4 offset-1 col-10 mt-5">
                <img class="img-fluid" src="{{ url('img/items/undraw_social_thinking_7ule.png') }}"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="d-none d-sm-none d-md-none d-lg-inline" style="line-height: 50px">
                    &nbsp;
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-5">
                <h1 class="text-center font-weight-bold color-000000">Request a personalized strategic session</h1>
                <div class="text-center">
                    <button type="button" class="btn btn-danger btn-lg bg-e53131 border-radius-25px px-5">Get Started</button>
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