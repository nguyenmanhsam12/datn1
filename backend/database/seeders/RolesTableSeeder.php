<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['name' => 'admin', 'display_name' => 'Admin'],
            ['name' => 'user', 'display_name' => 'User'],
            ['name' => 'manager','display_name'=>'Manager'],
            ['name' => 'support','display_name'=>'Support'],
            // Có thể thêm các vai trò khác nếu cần
        ]);
    }
}
