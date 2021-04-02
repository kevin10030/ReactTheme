<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">

    <style type="text/css" media="all">
        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
        .text-right {
            text-align: right;
        }

        .text-black {
            color: #000000;
        }

        .text-white {
            color: #ffffff;
        }

        .bg-success {
            background-color: #28a745;
        }

        .bg-primary {
            background-color: #007bff;
        }

        .bg-warning {
            background-color: #ffc107;
        }

        .bg-danger {
            background-color: #dc3545;
        }

        .fs-12px {
            font-size: 12px;
        }

        .w-100p {
            width: 100%;
        }

        .w-300px {
            width: 300px;
        }

        .w-400px {
            width: 400px;
        }

        .h-20px {
            height: 20px;
        }

        .mb-20px {
            margin-bottom: 20px;
        }

        .font-weight-light {
            font-weight: 300 !important;
        }

        .font-weight-lighter {
            font-weight: lighter !important;
        }

        .font-weight-normal {
            font-weight: 400 !important;
        }

        .font-weight-bold {
            font-weight: 700 !important;
        }

        .font-weight-bolder {
            font-weight: bolder !important;
        }

        .border-bottom-1px-solid-000 {
            border-bottom: 1px solid #000000;
        }

        .tbl-style-1 {
            border-collapse: collapse;
            width: 100%;
        }

        .tbl-style-1 td, .tbl-style-1 th {
            border-bottom: 1px solid #ddd;
            padding: 8px;
        }

        .tbl-style-2 {
            border-collapse: collapse;
            width: 100%;
        }

        .tbl-style-2 td, .tbl-style-2 th {
            padding: 6px;
        }
    </style>
</head>
<body>
    <table class="fs-12px tbl-style-1">
        <thead>
            <tr>
                <th>{{ucfirst(__('word.no'))}}</th>
                <th>{{ucfirst(__('word.survey'))}}</th>
                <th>{{ucfirst(__('word.score'))}}</th>
            </tr>
        </thead>
        <tbody>
            @for( $i = 0; $i < count( $details ); $i ++ )
                <tr>
                    <td> {{ $i + 1 }}</td>
                    <td> {{ $details[$i]->question }}</td>
                    <td> {{ $details[$i]->score }}</td>
                </tr>
            @endfor
        </tbody>
    </table>
</body>
</html>