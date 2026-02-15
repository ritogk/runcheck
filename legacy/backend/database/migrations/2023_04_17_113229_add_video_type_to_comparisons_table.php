<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVideoTypeToComparisonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comparisons', function (Blueprint $table) {
            $table->string('video1_type')->comment('youtube, local')->after('video1_time_st');
            $table->string('video2_type')->comment('youtube, local')->after('video2_time_st');
            $table->string('video_type')->nullable()->comment('リファクタに伴い未使用')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comparisons', function (Blueprint $table) {
            $table->dropColumn('video1_type');
            $table->dropColumn('video2_type');
        });
    }
}
