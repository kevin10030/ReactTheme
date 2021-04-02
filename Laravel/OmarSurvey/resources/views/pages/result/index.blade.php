@extends('layouts.back')

@section('title', ucfirst(__('word.title')) . ' | ' . ucfirst(__('word.result')))

@push('page_css')
    <!-- DataTable CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/datatables.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.ext.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/Select-1.3.0/css/select.bootstrap4.min.css') }}">
@endpush

@section('page_name', ucfirst(__('word.result')))

@push('page_content')
    <div class="card card-outline card-success mb-0">
        <div class="card-body">
            <div class="row">
                <div class="col-12 text-left mb-3">
                    <a href="{{ url('result/excelSurveyor')}}" class="btn btn-success">
                        <i class="fa fa-file-excel"></i> {{ ucfirst( __('word.excel') ) }}
                    </a>
                </div>
                <div class="col-12">
                    <table id="tbl_result" class="table table-bordered table-hover dataTable display responsive no-wrap" width="100%">
                        <thead>
                        <tr>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                            <th class="text-center text-middle min-width-50px"></th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endpush

@push('page_js')
    <!-- DataTable JS -->
    <script type="text/javascript" src="{{ asset('library/DataTables/datatables.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/DataTables/Select-1.3.0/js/select.bootstrap4.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/DataTables/Localization/' . app()->getLocale() . '.js') }}"></script>
@endpush

@push('page_script')
    <script type="text/javascript" defer>

        $(document).ready(function () {
            'use strict';

            /**
             * DataTable Initialize
             */
            $('#tbl_result').dataTable({
                "processing": true,
                "serverSide": true,
                "responsive": true,
                "fixedHeader": true,
                "stateSave": true,

                "ajax": {
                    "url": "{!! url( 'result/ajax/load' ) !!}",
                    "type": "POST",
                    "data": function (d) {
                    }
                },

                language: DataTable.Language,
                "pageLength": 10,
                "searching": true,
                "order": [[7, "asc"]],

                "columns": [
                    {
                        "title": "{{ ucfirst(__('word.no')) }}",
                        "data": null,
                        "searchable": false,
                        "orderable": false,
                        "class": "text-center text-middle",
                        "type": "number",
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.first_name' )) !!}",
                        "data": "first_name",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.last_name' )) !!}",
                        "data": "last_name",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.email' )) !!}",
                        "data": "email",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.gender' )) !!}",
                        "data": "gender",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string",
                        "render": function (data, type, row, meta) {
                            let html = '';

                            if( parseInt( data ) === 1 ){
                                html += '<span class="badge badge-primary">{!! ucfirst(__('word.male')) !!}</span>';
                            } else if( parseInt( data ) === 2 ){
                                html += '<span class="badge badge-danger">{!! ucfirst(__('word.female')) !!}</span>';
                            }

                            return html;
                        }
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.age' )) !!}",
                        "data": "age",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.status' )) !!}",
                        "data": "status",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string",
                        "render": function (data, type, row, meta) {
                            let html = '';

                            if( parseInt( data ) === 1 ){
                                html += '<span class="badge badge-primary">{!! ucfirst(__('word.new')) !!}</span>';
                            } else if( parseInt( data ) === 2 ){
                                html += '<span class="badge badge-info">{!! ucfirst(__('word.in_progress')) !!}</span>';
                            } else if( parseInt( data ) === 3 ){
                                html += '<span class="badge badge-danger">{!! ucfirst(__('word.abandon')) !!}</span>';
                            } else if( parseInt( data ) === 4 ){
                                html += '<span class="badge badge-success">{!! ucfirst(__('word.completed')) !!}</span>';
                            }

                            return html;
                        }
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.started_at' )) !!}",
                        "data": "created_at",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.finished_at' )) !!}",
                        "data": "updated_at",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    }
                ]
            });

            $('#tbl_result tbody').on('dblclick', 'tr', function (){
                var data = $('#tbl_result').dataTable().api().row( this ).data();
                window.open('{!! url('result/detail') !!}' + '/' + data.id);
            });
        });

    </script>
@endpush