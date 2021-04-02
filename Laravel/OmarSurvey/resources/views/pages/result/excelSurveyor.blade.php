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
                <th>{{ucfirst(__('word.started_at'))}}</th>
                <th>{{ucfirst(__('word.status'))}}</th>
                <th>{{ucfirst(__('word.first_name'))}}</th>
                <th>{{ucfirst(__('word.last_name'))}}</th>
                <th>{{ucfirst(__('word.email'))}}</th>
                <th>{{ucfirst(__('word.gender'))}}</th>
                <th>{{ucfirst(__('word.age'))}}</th>

                @for( $i = 0; $i < count( $surveies ); $i ++ )
                    <th>Q{{ $surveies[$i]->display_order }}</th>
                @endfor

                @for( $i = 0; $i < count( $categories ); $i ++ )
                    <th>{{ $categories[$i]->name }}</th>
                @endfor
            </tr>
        </thead>
        <tbody>
            @for( $i = 0; $i < count( $result ); $i ++ )
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td class="text-center">{{ $result[$i]->created_at }}</td>
                    <td class="text-center">
                        @if( $result[$i]->status === 1 )
                            {{ ucfirst(__('word.new')) }}
                        @elseif( $result[$i]->status === 2 )
                            {{ ucfirst(__('word.in_progress')) }}
                        @elseif( $result[$i]->status === 3 )
                            {{ ucfirst(__('word.abandon')) }}
                        @elseif( $result[$i]->status === 4 )
                            {{ ucfirst(__('word.completed')) }}
                        @endif
                    </td>
                    <td>{{ $result[$i]->first_name }}</td>
                    <td>{{ $result[$i]->last_name }}</td>
                    <td>{{ $result[$i]->email }}</td>
                    <td class="text-center">
                        @if( $result[$i]->gender === 1 )
                            {{ ucfirst(__('word.male'))  }}
                        @elseif( $result[$i]->gender === 2 )
                            {{ ucfirst(__('word.female'))  }}
                        @endif
                    </td>
                    <td class="text-right">{{ $result[$i]->age }}</td>

                    @for( $j = 0; $j < count( $surveies ); $j ++ )
                        <td>{{ $result[$i]['details'][$surveies[$j]->id] }}</td>
                    @endfor

                    @for( $j = 0; $j < count( $categories ); $j ++ )
                        <td>{{ $result[$i]['ranks'][$categories[$j]->id] }}</td>
                    @endfor
                </tr>
            @endfor
        </tbody>
    </table>
</body>
</html>
