@extends('layouts.front')

@section('title', ucfirst(__('word.title')) . ' | ' . ucfirst(__('word.sign_in')))

@push('page_css')
@endpush

@push('page_content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4 mt-5">
                <div class="card card-outline card-success mt-5">
                    <div class="card-body">
                        <p class="text-secondary text-center">{{ __('msg.sign_in_description') }}</p>
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="input-group mb-3">
                                <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="{{ucfirst(__('word.email'))}}" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control @error('password') is-invalid @enderror" placeholder="{{ucfirst(__('word.password'))}}" name="password" required autocomplete="current-password">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="row">
                                <div class="col-8">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="remember" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                        <label for="remember">
                                            {{ __('msg.remember_me') }}
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <button type="submit" class="btn btn-primary btn-block btn-flat">{{ ucfirst(__('word.sign_in')) }}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endpush

@push('page_js')
@endpush

@push('page_script')
    <script type="text/javascript" defer>

        $(document).ready(function () {
            'use strict';
        });

    </script>
@endpush