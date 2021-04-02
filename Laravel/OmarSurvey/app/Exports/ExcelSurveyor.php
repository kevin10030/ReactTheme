<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Point;
use App\Models\Survey;
use App\Models\Result;
use App\Models\ResultRank;
use App\Models\ResultDetail;


class ExcelSurveyor implements FromView, ShouldAutoSize, WithHeadingRow, WithEvents
{
    public function __construct( )
    {

    }

    public function view(): View
    {
        $categories = Category::where('status', 1)->orderBy('name')->get();
        $surveies   = Survey::where('status', 1)->orderBy('display_order')->get();

        $result = Result::orderBy('created_at')->get();

        if( !empty( $result ) ){
            for( $i = 0; $i < count( $result ); $i ++ ){
                $result[$i]['ranks'] = [];
                $result[$i]['details'] = [];

                $ranks = ResultRank::where('result_id', $result[$i]->id)->get();
                if( !empty( $ranks ) ){
                    $result_ranks = [];

                    for( $j = 0; $j < count( $ranks ); $j ++ ){
                        $result_ranks[ $ranks[$j]->category_id ] = $ranks[$j]->score;
                    }

                    $result[$i]['ranks'] = $result_ranks;
                }

                $details = ResultDetail::where('result_id', $result[$i]->id)->get();
                if( !empty( $details ) ){
                    $result_details = [];

                    for( $j = 0; $j < count( $details ); $j ++ ){
                        $point = Point::find( $details[$j]->point_id );

                        if( !empty( $point ) ){
                            $result_details[ $details[$j]->survey_id ] = $point->score;
                        } else {
                            $result_details[ $details[$j]->survey_id ] = 0;
                        }
                    }

                    $result[$i]['details'] = $result_details;
                }
            }
        }

        return view('pages.result.excelSurveyor', [
            'categories'    =>  $categories,
            'surveies'      =>  $surveies,
            'result'        =>  $result
        ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $cellRange = 'A1:ZZ1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setBold(true);
                $event->sheet->getDelegate()->getStyle($cellRange)->getAlignment()->setHorizontal('center');

                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
                $event->sheet->getDelegate()->getStyle($cellRange)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
            },
        ];
    }
}