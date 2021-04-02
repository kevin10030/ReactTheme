<div id="{{ $id }}" class="modal fade">
    <div class="modal-dialog modal-dialog-centered @isset($size) modal-{{$size}} @endisset">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ ucfirst(__('word.enable')) }} @isset($title) {{$title}} @endisset</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="text-center">{{ ucfirst(__('msg.enable_confirm')) }}</p>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fa fa-times"></i> {{ ucfirst(__('word.no')) }}</button>
                <button type="submit" class="btn btn-outline-success modal-confirm"><i class="fa fa-check"></i> {{ ucfirst(__('word.yes')) }}</button>
            </div>
        </div>
    </div>
</div>