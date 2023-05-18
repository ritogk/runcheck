<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ChangeUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comparisons', function (Blueprint $table) {
            DB::statement('UPDATE comparisons SET user_id = null WHERE user_id = 0');
            $table->Integer('user_id')->nullable(true)->change();
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
            DB::statement('UPDATE comparisons SET user_id = 0 WHERE user_id is null');
            $table->Integer('user_id')->nullable(false)->change();
        });
    }
}
