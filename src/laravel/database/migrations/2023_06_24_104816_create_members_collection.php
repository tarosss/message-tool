<?php

use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
use Jenssegers\Mongodb\Schema\Blueprint;

use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->integer('member_id');
            $table->string('member_name');
            $table->string('member_name_yomi');
            $table->string('display_member_name');
            $table->string('email');
            $table->string('tel');
            $table->string('status');
            $table->string('time_zone');
            $table->boolean('invested');

            $table->array('recently_used_icons');
            $table->timestamps();
            $table->primary('email');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
};
