<?php

use Illuminate\Database\Seeder;

class PointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $points = [
            [ 'score'   =>  1,  'label' =>  'más diferente a mí' ],
            [ 'score'   =>  2,  'label' =>  'muy mucho diferente a mi' ],
            [ 'score'   =>  3,  'label' =>  'muy diferente a mi' ],
            [ 'score'   =>  4,  'label' =>  'diferente a mí' ],
            [ 'score'   =>  5,  'label' =>  'un poco diferente a mi' ],
            [ 'score'   =>  6,  'label' =>  'neutral' ],
            [ 'score'   =>  7,  'label' =>  'poco como yo' ],
            [ 'score'   =>  8,  'label' =>  'como yo' ],
            [ 'score'   =>  9,  'label' =>  'mucho como yo' ],
            [ 'score'   =>  10, 'label' =>  'me gusta mucho' ],
        ];

        for( $i = 0; $i < count( $points ); $i ++ ){
            DB::table('points')->insert([
                'score'         =>  $points[$i]['score'],
                'label'         =>  $points[$i]['label'],
                'status'        =>  1,
                'memo'          =>  '',
                'created_at'    =>  date('Y-m-d H:i:s'),
                'updated_at'    =>  date('Y-m-d H:i:s')
            ]);
        }
    }
}
