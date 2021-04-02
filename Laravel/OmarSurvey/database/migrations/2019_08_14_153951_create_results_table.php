<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {

            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            $table->bigIncrements('id');
            $table->string('hash', 127);
            $table->string('first_name', 31);
            $table->string('last_name', 31);
            $table->string('email', 127);
            $table->unsignedTinyInteger('gender')->default(0);
            $table->unsignedInteger('age')->default(0);
            $table->unsignedTinyInteger('status')->default(1)->comment('1: New, 2: InProgress, 4: Complete, 5: Downloaded');
            $table->string('memo', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('results');
    }
}
