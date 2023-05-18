<?php

// namespace Database\Seeds;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => '管理者',
            'email' => 'homing0321r4cfw@yahoo.co.jp',
            'password' => bcrypt('P@ssw0rd'),
            'car_type' => 'FD2',
        ]);
        DB::table('analyzes')->insert([
            'multi_set' => 0,
        ]);
        $this->call(OperationLogSeeder::class);
    }
}
