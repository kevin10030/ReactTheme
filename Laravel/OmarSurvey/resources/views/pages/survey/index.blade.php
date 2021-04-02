@extends('layouts.back')

@section('title', ucfirst(__('word.title')) . ' | ' . ucfirst(__('word.survey')))

@push('page_css')
    <!-- DataTable CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/datatables.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.ext.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/DataTables/Select-1.3.0/css/select.bootstrap4.min.css') }}">

    <!-- jQuery Validate CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/jquery-validate/jquery.validate.css') }}">
@endpush

@section('page_name', ucfirst(__('word.survey')))

@push('page_content')

    <div class="card card-outline card-success mb-0">
        <div class="card-body">
            <div class="row">
                <div class="col-12 text-left mb-3">
                    <a id="btn_new" href="javascript: void(0)" class="btn btn-success">
                        <i class="fa fa-plus"></i> {{ ucfirst( __('word.new') ) }}
                    </a>
                </div>
                <div class="col-12">
                    <table id="tbl_survey" class="table table-bordered table-hover dataTable display responsive no-wrap" width="100%">
                        <thead>
                        <tr>
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

    @component('components.modal-new', ['id' => 'modal_new', 'size' => 'lg', 'form_id' => 'frm_new'])
        <form id="frm_new" class="container-fluid" method="POST" autocomplete="off" target="ifrm_new"
              action="{{ url( 'survey/ajax/create' ) }}">
            @csrf

            <div class="form-row">
                <div class="col-6">
                    <div class="form-group">
                        <label class="font-weight-bold">{{ ucfirst(__('word.category')) }} <span class="text-red">*</span></label>
                        <select name="category_id" class="form-control">
                            <option value=""></option>
                            @for( $i = 0; $i < count( $categories ); $i ++ )
                                <option value="{{ $categories[$i]->id }}">{{ $categories[$i]->name }}</option>
                            @endfor
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="font-weight-bold">{{ ucfirst(__('word.display_order')) }} <span class="text-red">*</span></label>
                        <input type="number" name="display_order" class="form-control" min="1" required/>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-12">
                    <div class="form-group">
                        <label class="font-weight-bold">{{ ucfirst(__('word.question')) }} <span class="text-red">*</span></label>
                        <textarea maxlength="511" rows="6" class="form-control" name="question" required></textarea>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-12">
                    <label class="font-weight-bold">{{ ucfirst(__('word.memo')) }}</label>
                    <textarea maxlength="255" rows="3" class="form-control" name="memo"></textarea>
                </div>
            </div>
        </form>
        <iframe id="ifrm_new" name="ifrm_new" class="display-none"></iframe>
    @endcomponent

    @component('components.modal-edit', ['id' => 'modal_edit', 'size' => 'lg', 'form_id' => 'frm_edit'])
        <form id="frm_edit" class="container-fluid" method="POST" autocomplete="off" target="ifrm_edit"
              action="{{ url( 'survey/ajax/update' ) }}">
            @csrf
            <input type="hidden" name="id" value="-1"/>

            <div class="form-row">
                <div class="col-6">
                    <div class="form-group">
                        <label class="font-weight-bold">{{ ucfirst(__('word.category')) }} <span class="text-red">*</span></label>
                        <select name="category_id" class="form-control">
                            <option value=""></option>
                            @for( $i = 0; $i < count( $categories ); $i ++ )
                                <option value="{{ $categories[$i]->id }}">{{ $categories[$i]->name }}</option>
                            @endfor
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="font-weight-bold">{{ ucfirst(__('word.display_order')) }} <span class="text-red">*</span></label>
                        <input type="number" name="display_order" class="form-control" min="1" required/>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-12">
                    <div class="form-group">
                        <label class="font-weight-bold">{{ ucfirst(__('word.question')) }} <span class="text-red">*</span></label>
                        <textarea maxlength="511" rows="6" class="form-control" name="question" required></textarea>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-12">
                    <label class="font-weight-bold">{{ ucfirst(__('word.memo')) }}</label>
                    <textarea maxlength="255" rows="3" class="form-control" name="memo"></textarea>
                </div>
            </div>
        </form>
        <iframe id="ifrm_edit" name="ifrm_edit" class="display-none"></iframe>
    @endcomponent

    @component('components.modal-delete', ['id' => 'modal_delete'])
    @endcomponent

    @component('components.modal-enable', ['id' => 'modal_enable'])
    @endcomponent

    @component('components.modal-disable', ['id' => 'modal_disable'])
    @endcomponent

@endpush

@push('page_js')
    <!-- DataTable JS -->
    <script type="text/javascript" src="{{ asset('library/DataTables/datatables.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/DataTables/Select-1.3.0/js/select.bootstrap4.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/DataTables/Localization/' . app()->getLocale() . '.js') }}"></script>

    <!-- jQuery Validate JS -->
    <script type="text/javascript" src="{{ asset('library/jquery-validate/jquery.validate.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('library/jquery-validate/additional-methods.min.js') }}"></script>
@endpush

@push('page_script')
    <script type="text/javascript" defer>

        $(document).ready(function () {
            'use strict';

            /**
             * DataTable Initialize
             */
            $('#tbl_survey').dataTable({
                "processing": true,
                "serverSide": true,
                "responsive": true,
                "fixedHeader": true,
                "stateSave": true,

                "ajax": {
                    "url": "{!! url( 'survey/ajax/load' ) !!}",
                    "type": "POST",
                    "data": function (d) {
                    }
                },

                language: DataTable.Language,
                "pageLength": 10,
                "searching": true,
                "order": [[1, "asc"]],

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
                        "title": "{!! ucfirst(__( 'word.display_order' )) !!}",
                        "data": "display_order",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "number"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.category' )) !!}",
                        "data": "category_name",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-center text-middle",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.question' )) !!}",
                        "data": "question",
                        "searchable": true,
                        "orderable": true,
                        "class": "text-left text-middle",
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
                            return parseInt( data ) === 1 ? '{!! ucfirst(__('word.enabled')) !!}' : '{!! ucfirst(__('word.disabled')) !!}';
                        }
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.memo' )) !!}",
                        "data": "memo",
                        "searchable": true,
                        "orderable": false,
                        "class": "text-left text-middle text-break",
                        "type": "string"
                    },
                    {
                        "title": "{!! ucfirst(__( 'word.action' )) !!}",
                        "data": null,
                        "searchable": false,
                        "orderable": false,
                        "class": "text-center text-middle actions",
                        "type": "html",
                        "render": function (data, type, row, meta) {
                            let html = '';

                            if( parseInt( row.status ) === 1 )
                                html += '<a href="#" class="disable-row mr-3 text-decoration-none" style="color: #28a745;"><i class="fa fa-eye-slash"></i></a>';

                            if( parseInt( row.status ) === 2 )
                                html += '<a href="#" class="enable-row mr-3 text-decoration-none" style="color: #28a745;"><i class="fa fa-eye"></i></a>';

                            html += '<a href="#" class="edit-row mr-3 text-decoration-none" style="color: #28a745;"><i class="fa fa-edit"></i></a>' +
                                '<a href="#" class="remove-row text-decoration-none" style="color: #28a745;"><i class="fa fa-trash"></i></a>';

                            return html;
                        }
                    }
                ]
            });

            /**
             * New action
             */
            $('#btn_new').on('click', function(e){
                $.ajax({
                    url: '{{ url( 'survey/ajax/get_display_order' ) }}',
                    method: 'POST',
                    data: { },
                    dataType: 'json',
                    success: function (result, status, xhr) {
                        $('#modal_new input[name="display_order"]').val( result.display_order );
                        $('#modal_new').modal('show');
                    },
                    error: function (xhr, status, error) {

                    }
                });
            });

            $('#frm_new').validate({
                rules: {
                    display_order: {
                        required: true,
                        number: true
                    },
                    category_id: {
                        required: true
                    },
                    question: {
                        required: true,
                        maxlength: 511
                    }
                }
            });

            $("#frm_new input, textarea").on("change, keyup", function (e) {
                $("#frm_new").validate().resetForm();
            });

            $("#ifrm_new").on("load", function () {
                let ret = $("#ifrm_new").contents().find("body").html();

                if (ret === "" || ret === undefined)
                    return;

                ret = $.parseJSON(ret);

                if (ret.code === 0) {
                    $('#modal_new').modal('hide');

                    $('#modal_new select[name="category_id"]').val('');
                    $('#modal_new input[name="display_order"]').val('');
                    $('#modal_new textarea[name="question"]').val('');
                    $('#modal_new textarea[name="memo"]').val('');
                    $("#tbl_survey").dataTable().api().ajax.reload();

                    Toast.fire({
                        type: 'success',
                        title: "{{ __('msg.data_insert_success') }}"
                    });

                } else {
                    if( ret.code === 1 )
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.data_insert_duplicate') }}"
                        });
                    else
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.data_insert_error') }}"
                        });
                }
            });

            let data = null;

            /**
             * Edit Action
             */
            $('#frm_edit').validate({
                rules: {
                    display_order: {
                        required: true,
                        number: true
                    },
                    category_id: {
                        required: true
                    },
                    question: {
                        required: true,
                        maxlength: 511
                    }
                }
            });

            $("#frm_edit input, select, textarea").on("change, keyup", function (e) {
                $("#frm_edit").validate().resetForm();
            });

            $("#tbl_survey").on('click', 'a.edit-row', function (e) {
                e.preventDefault();

                let $row = $(this).closest('tr');
                data = $('#tbl_survey').dataTable().api().row($row).data();

                $('#modal_edit input[name="id"]').val( data.id );
                $('#modal_edit select[name="category_id"]').val( data.category_id );
                $('#modal_edit input[name="display_order"]').val( data.display_order );
                $('#modal_edit textarea[name="question"]').val( data.question );
                $('#modal_edit textarea[name="memo"]').val( data.memo );

                $('#modal_edit').modal('show');
            });

            $("#ifrm_edit").on("load", function () {
                let ret = $("#ifrm_edit").contents().find("body").html();

                if (ret === "" || ret === undefined)
                    return;

                ret = $.parseJSON(ret);

                data = null;

                if (ret.code === 0) {
                    $('#modal_edit').modal('hide');

                    $("#tbl_survey").dataTable().api().ajax.reload();

                    Toast.fire({
                        type: 'success',
                        title: "{{ __('msg.data_update_success') }}"
                    });
                } else {
                    if( ret.code === 1 )
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.data_update_duplicate') }}"
                        });
                    else
                        Toast.fire({
                            type: 'error',
                            title: "{{ __('msg.data_update_error') }}"
                        });
                }
            });

            /**
             * Delete Action
             */

            $("#tbl_survey").on('click', 'a.remove-row', function (e) {
                e.preventDefault();

                let $row = $(this).closest('tr');
                data = $('#tbl_survey').dataTable().api().row($row).data();

                $('#modal_delete').modal('show');
            });

            $(document).on('click', '#modal_delete .modal-confirm', function (e) {
                e.preventDefault();

                $.ajax({
                    url: '{{ url( 'survey/ajax/delete' ) }}',
                    method: 'POST',
                    data: {
                        id: data.id
                    },
                    success: function (result, status, xhr) {
                        data = null;
                        $('#modal_delete').modal('hide');
                        $("#tbl_survey").dataTable().api().ajax.reload();

                        Toast.fire({
                            type: 'success',
                            title: "{{ __('msg.data_delete_success') }}"
                        });
                    },
                    error: function (xhr, status, error) {
                        Toast.fire({
                            type: 'success',
                            title: "{{ __('msg.data_delete_error') }}"
                        });
                    }
                });
            });

            /**
             * Enable Action
             */

            $("#tbl_survey").on('click', 'a.enable-row', function (e) {
                e.preventDefault();

                let $row = $(this).closest('tr');
                data = $('#tbl_survey').dataTable().api().row($row).data();

                $('#modal_enable').modal('show');
            });

            $(document).on('click', '#modal_enable .modal-confirm', function (e) {
                e.preventDefault();

                $.ajax({
                    url: '{{ url( 'survey/ajax/enable' ) }}',
                    method: 'POST',
                    data: {
                        id: data.id
                    },
                    success: function (result, status, xhr) {
                        data = null;
                        $('#modal_enable').modal('hide');
                        $("#tbl_survey").dataTable().api().ajax.reload();

                        Toast.fire({
                            type: 'success',
                            title: "{{ __('msg.data_enable_success') }}"
                        });
                    },
                    error: function (xhr, status, error) {
                        Toast.fire({
                            type: 'success',
                            title: "{{ __('msg.data_enable_error') }}"
                        });
                    }
                });
            });

            /**
             * Disable Action
             */

            $("#tbl_survey").on('click', 'a.disable-row', function (e) {
                e.preventDefault();

                let $row = $(this).closest('tr');
                data = $('#tbl_survey').dataTable().api().row($row).data();

                $('#modal_disable').modal('show');
            });

            $(document).on('click', '#modal_disable .modal-confirm', function (e) {
                e.preventDefault();

                $.ajax({
                    url: '{{ url( 'survey/ajax/disable' ) }}',
                    method: 'POST',
                    data: {
                        id: data.id
                    },
                    success: function (result, status, xhr) {
                        data = null;
                        $('#modal_disable').modal('hide');
                        $("#tbl_survey").dataTable().api().ajax.reload();

                        Toast.fire({
                            type: 'success',
                            title: "{{ __('msg.data_disable_success') }}"
                        });
                    },
                    error: function (xhr, status, error) {
                        Toast.fire({
                            type: 'success',
                            title: "{{ __('msg.data_disable_error') }}"
                        });
                    }
                });
            });
        });

    </script>
@endpush