<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResultDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('result_details', function (Blueprint $table) {

            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            $table->bigIncrements('id');
            $table->unsignedBigInteger('result_id');
            $table->unsignedBigInteger('survey_id');
            $table->unsignedBigInteger('point_id')->nullable();
            $table->timestamps();

            $table->foreign('result_id')->references('id')->on('results')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('survey_id')->references('id')->on('surveys')
                ->onUpdate('cascade')->onDelete('cascade');

            /*$table->foreign('point_id')->references('id')->on('points')
                ->onUpdate('cascade')->onDelete('cascade');*/
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('result_details');
    }
}
