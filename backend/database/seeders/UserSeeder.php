<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'username' => 'yvan',
            'name' => 'Yosia Evan',
            'email' => 'yosiaevan23@gmail.com',
            'password' => bcrypt('Yosia123;'),
            'role' => 'admin',
        ]);
    }
}
