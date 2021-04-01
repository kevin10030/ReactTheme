<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStrategicRequest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('strategic_requests', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            $table->bigIncrements('id');
            $table->string('first_name', 31)->nullable();
            $table->string('last_name', 31)->nullable();
            $table->string('business_email', 63)->nullable();
            $table->string('phone', 31)->nullable();
            $table->string('company_name', 63)->nullable();
            $table->string('country', 3)->nullable();
            $table->unsignedInteger('company_size')->default(0);
            $table->string('facebook', 255)->nullable();

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
        Schema::dropIfExists('strategic_requests');
    }
}
