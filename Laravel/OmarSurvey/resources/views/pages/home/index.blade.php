@extends('layouts.front')

@section('title', ucfirst(__('word.title')) . ' | ' . ucfirst(__('word.home')))

@push('page_css')
@endpush

@push('page_content')

    <div class="container">
        <div class="row">
            <div class="col-8">
                <div class="card card-outline card-success mt-5">
                    <div class="card-body">
                        <div class="row">
                            @for( $i = 0; $i < count( $categories ); $i ++ )
                                <div class="col-6">
                                    <div class="info-box bg-success">
                                        <span class="info-box-icon">
                                            <i class="fa fa-universal-access"></i>
                                        </span>
                                        <div class="info-box-content">
                                            <table style="width: 100%; height: 100%;">
                                                <tr>
                                                    <td style="vertical-align: middle; text-align: right;">
                                                        <h4>{{ $categories[$i]->name }}</h4>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            @endfor
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card card-outline card-success mt-5">
                    <form id="frm_create" class="form-horizontal" method="POST" autocomplete="off" target="ifrm_create" action="{{ url('home/ajax/create') }}" onsubmit="return validateCreate();">
                        @csrf
                        <div class="card-body">
                            <div class="form-group">
                                <label class="col-form-label">{{ ucfirst(__('word.first_name')) }}</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input name="first_name" type="text" class="form-control">
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">{{ ucfirst(__('word.last_name')) }}</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input name="last_name" type="text" class="form-control">
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">{{ ucfirst(__('word.email')) }}</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                                    </div>
                                    <input name="email" type="email" class="form-control">
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">{{ ucfirst(__('word.gender')) }}</label>
                                <select name="gender" class="form-control" style="width: 100%;">
                                    <option value="0">{{ ucfirst(__('word.select_your_gender')) }}</option>
                                    <option value="1">{{ ucfirst(__('word.male')) }}</option>
                                    <option value="2">{{ ucfirst(__('word.female')) }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">{{ ucfirst(__('word.age')) }}</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input name="age" type="number" class="form-control" step="1" min="1" max="100">
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <button type="submit" class="btn btn-warning w-100">{{ strtoupper(__('word.take_the_free_survey')) }}</button>
                        </div>
                    </form>
                    <iframe id="ifrm_create" name="ifrm_create" class="display-none"></iframe>
                </div>
            </div>
        </div>
    </div>

@endpush

@push('page_js')
@endpush

@push('page_script')
    <script type="text/javascript" defer>

        function validateCreate(){
            let first_name  = $("#frm_create input[name='first_name']").val();
            let last_name   = $("#frm_create input[name='last_name']").val();
            let email       = $("#frm_create input[name='email']").val();
            let gender      = $("#frm_create select[name='gender']").val();
            let age         = $("#frm_create input[name='age']").val();

            if( !isEmpty( first_name ) && !isEmpty( last_name ) && !isEmpty( email ) && !isEmpty( gender ) && parseInt( gender ) > 0 && !isEmpty( age ) && parseInt( age ) > 0 ){
                $("body").ajaxloader({
                    cssClass: 'lukehaas_circle_on_path'
                });
                return true;
            } else {
                if( isEmpty( first_name ) ){
                    $("#frm_create input[name='first_name']").addClass('is-invalid');
                }

                if( isEmpty( last_name ) ){
                    $("#frm_create input[name='last_name']").addClass('is-invalid');
                }

                if( isEmpty( email ) ){
                    $("#frm_create input[name='email']").addClass('is-invalid');
                }

                if( isEmpty( gender ) || gender <= 0 ){
                    $("#frm_create select[name='gender']").addClass('is-invalid');
                }

                if( isEmpty( age ) || age <= 0 ){
                    $("#frm_create input[name='age']").addClass('is-invalid');
                }
            }

            return false;
        }

        $(document).ready(function () {
            'use strict';

            $("#frm_create select").on("change", function(e){
                $(this).removeClass('is-invalid');
            });
            $("#frm_create input").on("keyup", function(e){
                $(this).removeClass('is-invalid');
            });

            $("#ifrm_create").on("load", function () {
                let ret = $("#ifrm_create").contents().find("body").html();

                if (ret === "" || ret === undefined)
                    return;

                ret = $.parseJSON(ret);

                let data = null;

                if (ret.code === 0) {
                    window.location.href = "{!! url('take') !!}/" + ret.hash;
                    $("body").ajaxloader('stop');
                } else {
                    if( ret.code === 1 )
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.email_duplicated') }}"
                        });
                    else
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.register_error') }}"
                        });
                }
            });
        });
    </script>
@endpush