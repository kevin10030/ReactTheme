@extends('layouts.front')

@section('title', ucfirst(__('word.title')) . ' | ' . ucfirst(__('word.finish')))

@push('page_css')
@endpush

@push('page_content')
    <input name="hash" type="hidden" value="{{ $hash }}" />

    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-outline card-success mt-3">
                    <div class="card-body">

                        <div class="row mb-5">
                            <div class="col-12">
                                <p class="fs-16px">{{ __('msg.finish_s1') }}</p>
                                <p class="fs-16px">{{ __('msg.finish_s2') }}</p>
                                <p class="fs-16px"><a href="{{ url('finish/pdf').'/'.$hash  }}">{{ __('msg.finish_s3') }}</a></p>
                            </div>
                        </div>

                        @for( $i = 0; $i < count( $ranks ); $i ++ )
                            <div class="row fs-20px">
                                <div class="col-4">
                                    {{ ($i + 1) }}. {{ $ranks[$i]->category->name }}
                                </div>
                                <div class="col-8">
                                    @if( $ranks[$i]->score === 50 )
                                        <div class="progress fs-20px" style="height: 20px;">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: {{$ranks[$i]->score * 100 / 50}}%">{{$ranks[$i]->score * 100 / 50}}%</div>
                                        </div>
                                    @elseif( $ranks[$i]->score >= 40 && $ranks[$i]->score < 50)
                                        <div class="progress fs-20px" style="height: 20px;">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: {{$ranks[$i]->score * 100 / 50}}%">{{$ranks[$i]->score * 100 / 50}}%</div>
                                        </div>
                                    @elseif( $ranks[$i]->score >= 30 && $ranks[$i]->score < 40)
                                        <div class="progress fs-20px" style="height: 20px;">
                                            <div class="progress-bar bg-warning" role="progressbar" style="width: {{$ranks[$i]->score * 100 / 50}}%">{{$ranks[$i]->score * 100 / 50}}%</div>
                                        </div>
                                    @elseif( $ranks[$i]->score < 30)
                                        <div class="progress fs-20px" style="height: 20px;">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: {{$ranks[$i]->score * 100 / 50}}%">{{$ranks[$i]->score * 100 / 50}}%</div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                        @endfor

                    </div>
                </div>
            </div>
        </div>

        @for( $i = 0; $i < count( $ranks ); $i ++ )
            <div class="row">
                <div class="col-12">
                    @if( $ranks[$i]->score === 50 )
                        <div class="card card-success mt-3">
                            <div class="card-header">
                                <h3 class="card-title">{{ $ranks[$i]->category->name }}</h3>
                            </div>
                            <div class="card-body">
                                <p class="fs-16px">
                                    {{ $ranks[$i]->category->description }}
                                </p>
                            </div>
                        </div>
                    @elseif( $ranks[$i]->score >= 40 && $ranks[$i]->score < 50)
                        <div class="card card-primary mt-3">
                            <div class="card-header">
                                <h3 class="card-title">{{ $ranks[$i]->category->name }}</h3>
                            </div>
                            <div class="card-body">
                                <p class="fs-16px">
                                    {{ $ranks[$i]->category->description }}
                                </p>
                            </div>
                        </div>
                    @elseif( $ranks[$i]->score >= 30 && $ranks[$i]->score < 40)
                        <div class="card card-warning mt-3">
                            <div class="card-header">
                                <h3 class="card-title">{{ $ranks[$i]->category->name }}</h3>
                            </div>
                            <div class="card-body">
                                <p class="fs-16px">
                                    {{ $ranks[$i]->category->description }}
                                </p>
                            </div>
                        </div>
                    @elseif( $ranks[$i]->score < 30)
                        <div class="card card-danger mt-3">
                            <div class="card-header">
                                <h3 class="card-title">{{ $ranks[$i]->category->name }}</h3>
                            </div>
                            <div class="card-body">
                                <p class="fs-16px">
                                    {{ $ranks[$i]->category->description }}
                                </p>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        @endfor
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