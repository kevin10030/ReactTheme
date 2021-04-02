<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Illuminate\Support\Facades\DB;


class ExcelResult implements FromView, ShouldAutoSize, WithHeadingRow, WithEvents
{
    public $result_id = 0;

    public function __construct( $result_id )
    {
        $this->result_id = $result_id;
    }

    public function view(): View
    {
        $details = DB::table('result_details')
            ->select('result_details.*',
                'surveys.question as question',
                'points.score as score')
            ->leftJoin('surveys', 'result_details.survey_id', '=', 'surveys.id')
            ->leftJoin('points', 'result_details.point_id', '=', 'points.id')
            ->get();

        return view('pages.result.excel', [
            'details'   => $details,
        ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $cellRange = 'A1:C1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setBold(true);
                $event->sheet->getDelegate()->getStyle($cellRange)->getAlignment()->setHorizontal('center');

                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
                $event->sheet->getDelegate()->getStyle($cellRange)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
            },
        ];
    }
}