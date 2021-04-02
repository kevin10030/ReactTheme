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
    <section id="p_1" style="page-break-after: always;">
        <div class="w-100p mb-20px">
            <h1 class="text-center">{{ __('word.site_name') }}</h1>
        </div>

        <table class="fs-12px tbl-style-1">
            <tr>
                <td>{{ucfirst(__('word.first_name'))}}:</td>
                <td class="font-weight-bold">{{ $result->first_name }}</td>
                <td>{{ucfirst(__('word.last_name'))}}:</td>
                <td class="font-weight-bold">{{ $result->last_name }}</td>
            </tr>
            <tr>
                <td>{{ucfirst(__('word.email'))}}:</td>
                <td class="font-weight-bold">{{ $result->email }}</td>
                <td>{{ucfirst(__('word.gender'))}}:</td>
                <td class="font-weight-bold">
                    @if( $result->gender === 1 )
                        {{ ucfirst(__('word.male')) }}
                    @elseif( $result->gender === 2 )
                        {{ ucfirst(__('word.female')) }}
                    @endif
                </td>
            </tr>
            <tr>
                <td>{{ucfirst(__('word.age'))}}:</td>
                <td class="font-weight-bold">{{ $result->age }}</td>
                <td>{{ucfirst(__('word.status'))}}:</td>
                <td class="font-weight-bold">
                    @if( $result->status === 1 )
                        {{ ucfirst(__('word.new')) }}
                    @elseif( $result->status === 2 )
                        {{ ucfirst(__('word.in_progress')) }}
                    @elseif( $result->status === 3 )
                        {{ ucfirst(__('word.abandon')) }}
                    @elseif( $result->status === 4 )
                        {{ ucfirst(__('word.completed')) }}
                    @endif
                </td>
            </tr>
            <tr>
                <td>{{ucfirst(__('word.started_at'))}}:</td>
                <td class="font-weight-bold">{{ $result->created_at }}</td>
                <td>{{ucfirst(__('word.finished_at'))}}:</td>
                <td class="font-weight-bold">{{ $result->updated_at }}</td>
            </tr>
        </table>

        <div class="w-100p h-20px"></div>

        <table class="fs-12px tbl-style-2">
            <tr class="border-bottom-1px-solid-000">
                <td>{{ucfirst(__('word.no'))}}</td>
                <td>{{ucfirst(__('word.category'))}}</td>
                <td>{{ucfirst(__('word.score'))}}</td>
            </tr>

            @for( $i = 0; $i < count( $ranks ); $i ++ )
                <tr>
                    <td>{{ $i + 1 }}.</td>
                    <td>{{ $ranks[$i]->category->name }}</td>
                    <td class="w-400px">
                        @if( $ranks[$i]->score === 50 )
                            <div class="bg-success text-white text-center" style="width: {{$ranks[$i]->score * 100 / 50}}%; height: 12px;">{{$ranks[$i]->score * 100 / 50}}%</div>
                        @elseif( $ranks[$i]->score >= 40 && $ranks[$i]->score < 50)
                            <div class="bg-primary text-white text-center" style="width: {{$ranks[$i]->score * 100 / 50}}%; height: 12px;">{{$ranks[$i]->score * 100 / 50}}%</div>
                        @elseif( $ranks[$i]->score >= 30 && $ranks[$i]->score < 40)
                            <div class="bg-warning text-white text-center" style="width: {{$ranks[$i]->score * 100 / 50}}%; height: 12px;">{{$ranks[$i]->score * 100 / 50}}%</div>
                        @elseif( $ranks[$i]->score < 30)
                            <div class="bg-danger text-white text-center" style="width: {{$ranks[$i]->score * 100 / 50}}%; height: 12px;">{{$ranks[$i]->score * 100 / 50}}%</div>
                        @endif
                    </td>
                </tr>
            @endfor
        </table>
    </section>

    <section id="p_2" style="page-break-after: avoid;">

        @for( $i = 0; $i < count( $ranks ); $i ++ )
            @if( $ranks[$i]->score === 50 )
                <div class="w-100p mb-20px">
                    <h3 class="bg-success text-white">{{ $ranks[$i]->category->name }}</h3>
                    <p>{{ $ranks[$i]->category->description }}</p>
                </div>
            @elseif( $ranks[$i]->score >= 40 && $ranks[$i]->score < 50)
                <div class="w-100p mb-20px">
                    <h3 class="bg-primary text-white">{{ $ranks[$i]->category->name }}</h3>
                    <p>{{ $ranks[$i]->category->description }}</p>
                </div>
            @elseif( $ranks[$i]->score >= 30 && $ranks[$i]->score < 40)
                <div class="w-100p mb-20px">
                    <h3 class="bg-warning text-white">{{ $ranks[$i]->category->name }}</h3>
                    <p>{{ $ranks[$i]->category->description }}</p>
                </div>
            @elseif( $ranks[$i]->score < 30)
                <div class="w-100p mb-20px">
                    <h3 class="bg-danger text-white">{{ $ranks[$i]->category->name }}</h3>
                    <p>{{ $ranks[$i]->category->description }}</p>
                </div>
            @endif
        @endfor

    </section>

</body>
</html>