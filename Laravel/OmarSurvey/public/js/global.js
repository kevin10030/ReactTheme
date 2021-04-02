let Toast = null;

function isEmpty( str ){

    if( str === null || str === undefined || str === '' )
        return true;
    else
        return false;

    return true;
}

$(document).ready(function () {
    'use strict';

     Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    /*
        Laravel Ajax Token Setup
     */
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr("content")
        }
    });
});