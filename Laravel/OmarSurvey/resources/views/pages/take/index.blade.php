@extends('layouts.front')

@section('title', ucfirst(__('word.title')) . ' | ' . ucfirst(__('word.take')))

@push('page_css')
    <link rel="stylesheet" type="text/css" href="{{ asset('library/jquery-radios-to-slider/css/radios-to-slider.min.css') }}">
@endpush

@push('page_content')
    <input name="hash" type="hidden" value="{{ $hash }}" />
    <input name="page" type="hidden" value="{{ $page }}" />
    <input name="max_page" type="hidden" value="{{ $max_page }}" />

    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-outline card-success mt-3">
                    <div class="card-header">
                        <h3 class="card-title">{{ __('word.questionnaire') }}</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-widget="collapse"><i class="fas fa-minus"></i>
                            </button>
                        </div>

                        <div class="row mt-3">
                            <div class="col-12">
                                <div class="progress">
                                    <div id="survey_progress" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row fs-16px">
                            <ul>
                                <li>{{ __('msg.page_take.s1') }}</li>
                                <li>{{ __('msg.page_take.s2') }}</li>
                                <li>{{ __('msg.page_take.s3') }}</li>
                                <li>{{ __('msg.page_take.s4') }}</li>
                                <li>{{ __('msg.page_take.s5') }}</li>
                            </ul>
                        </div>
                        <div class="row mt-5">
                            <div class="offset-0 col-12 offset-lg-3 col-lg-6">
                                <div id="radioslider-top">
                                    @for( $i = 0; $i < count( $points ); $i ++ )
                                        <input id="rd_{{ $points[$i]->id }}" type="radio">
                                        <label for="rd_{{ $points[$i]->id }}">{{ $points[$i]->score }}</label>
                                    @endfor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card card-outline card-success mt-3">
                    <div id="survey-body" class="card-body">

                    </div>
                    <div class="card-footer">
                        <button id="btn_save_continue" type="button" class="btn btn-lg btn-success w-100" disabled>{{strtoupper(__('word.save_and_continue'))}}</button>
                        <button id="btn_finish" type="button" class="btn btn-lg btn-danger w-100 display-none" disabled>{{ strtoupper(__('word.finish')) }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endpush

@push('page_js')
    <script src="{{ asset('library/jquery-radios-to-slider/js/jquery.radios-to-slider.min.js') }}"></script>
@endpush

@push('page_script')
    <script type="text/javascript" defer>

        let g_answer = new Array();

        function getSurvey(){
            let page        = parseInt( $("input[name='page']").val() );
            let max_page    = parseInt( $("input[name='max_page']").val() );

            if( page >= max_page )
                return;

            $("body").ajaxloader({
                cssClass: 'lukehaas_circle_on_path'
            });

            $.ajax({
                url: '{{ url( 'take/ajax/get_survey' ) }}',
                method: 'POST',
                data: {
                    hash: $("input[name='hash']").val(),
                    page: $("input[name='page']").val(),
                },
                dataType: "json",
                success: function (result, status, xhr) {

                    if( parseInt( result.code ) === 0 ){

                        let html = '';
                        for( var i = 0; i < result.surveys.length; i ++ ){
                            html += '<div id="survey_' + result.surveys[i].id + '" class="row border-bottom text-dark my-5 survey">';

                            html += '<div class="col-12 col-md-6 text-wrap">';
                            html += '<h4 class="font-weight-light">' + result.surveys[i].question + '</h4>';
                            html += '</div>';

                            html += '<div class="col-12 col-md-6">';
                            html += '<div id="rd_' + result.surveys[i].id + '" class="radios">';
                            @for( $i = 0; $i < count( $points ); $i ++ )
                                html += '<input id="rd_' + result.surveys[i].id + '_{!! $points[$i]->id !!}" name="survey_' + result.surveys[i].id + '" type="radio">';

                                html += '<label for="rd_' + result.surveys[i].id + '_{!! $points[$i]->id !!}">';
                                html += '{!! $points[$i]->score !!}';
                                html += '</label>';
                            @endfor
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                        }
                        $('#survey-body').html( html );
                        $(".radios").radiosToSlider({
                            size: 'medium',
                            animation: true,
                            fitContainer: true,
                            isDisable: false,
                            onSelect: function(radio_element,lvl_input){
                                let arr_ids     = radio_element[0].id.split('_');
                                let new_answer  = {
                                    survey_id: arr_ids[1],
                                    point_id: arr_ids[2]
                                };
                                g_answer.push( new_answer );

                                $(radio_element).closest('.survey').removeClass('text-dark');
                                $(radio_element).closest('.survey').addClass('text-primary');

                                let remain_surveys = $("#survey-body .survey.text-dark");
                                if( remain_surveys === null || remain_surveys.length === 0 ){
                                    if( !$("#btn_save_continue").hasClass("display-none") )
                                        $("#btn_save_continue").removeAttr('disabled');

                                    if( !$("#btn_finish").hasClass("display-none") )
                                        $("#btn_finish").removeAttr('disabled');
                                }
                            }
                        });

                        $("body").ajaxloader('stop');

                        $(window).scrollTop( 0 );

                    } else {
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.request_is_not_valid') }}"
                        });
                    }
                },
                error: function (xhr, status, error) {
                    Toast.fire({
                        type: 'error',
                        title: "{{ __('msg.request_error') }}"
                    });
                }
            });
        }

        $(document).ready(function () {
            'use strict';

            $("#radioslider-top").radiosToSlider({
                size: 'medium',
                animation: true,
                fitContainer: true,
                isDisable: false,
                onSelect: function(radio_element,lvl_input){

                }
            });
            getSurvey();

            $("#btn_save_continue").on("click", function(evt){
                let page        = parseInt( $("input[name='page']").val() );
                let max_page    = parseInt( $("input[name='max_page']").val() );

                $.ajax({
                    url: '{{ url( 'take/ajax/submit_survey' ) }}',
                    method: 'POST',
                    data: {
                        hash: $("input[name='hash']").val(),
                        answer: g_answer,
                    },
                    dataType: "json",
                    success: function (result, status, xhr) {
                        g_answer = null;
                        g_answer = new Array();

                        if( page < max_page - 1 ){
                            $("input[name='page']").val( page + 1 );
                            getSurvey();
                            $("#survey_progress").css("width", ((page + 1) * 100 / max_page) + "%");
                            $("#survey_progress").html( Math.floor( (page + 1) * 100 / max_page ) + "%" );
                            $("#btn_save_continue").attr("disabled", true);

                            if( page === max_page - 2 ){
                                $("#btn_save_continue").addClass("display-none");
                                $("#btn_finish").removeClass("display-none");
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.submit_error') }}"
                        });
                    }
                });
            });

            $("#btn_finish").on("click", function(e){

                $("body").ajaxloader({
                    cssClass: 'lukehaas_circle_on_path'
                });

                $.ajax({
                    url: '{{ url( 'take/ajax/finish_survey' ) }}',
                    method: 'POST',
                    data: {
                        hash: $("input[name='hash']").val(),
                        answer: g_answer,
                    },
                    dataType: "json",
                    success: function (result, status, xhr) {
                        $("body").ajaxloader('stop');
                        window.location.href = "{!! url('finish') !!}/" + result.hash;

                        $("#survey_progress").css("width", "100%");
                        $("#survey_progress").html( "100%" );
                    },
                    error: function (xhr, status, error) {
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.submit_error') }}"
                        });
                    }
                });
            });
        });
    </script>
@endpush