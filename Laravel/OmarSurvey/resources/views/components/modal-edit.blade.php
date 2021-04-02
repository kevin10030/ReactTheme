<div id="{{ $id }}" class="modal fade">
    <div class="modal-dialog modal-dialog-centered @isset($size) modal-{{$size}} @endisset">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ ucfirst(__('word.edit')) }} @isset($title) {{$title}} @endisset</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {{ $slot }}
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fa fa-times"></i> {{ ucfirst(__('word.cancel')) }}</button>
                <button type="submit" class="btn btn-outline-success modal-confirm" form="{{ $form_id }}"><i class="fa fa-save"></i> {{ ucfirst(__('word.save')) }}</button>
            </div>
        </div>
    </div>
</div>