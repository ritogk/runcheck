<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAnonymousToComparisonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comparisons', function (Blueprint $table) {
            $table->boolean('anonymous')->default(false)->comment('匿名フラグ')->after('video_type');
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
            $table->dropColumn('anonymous');
        });
    }
}
