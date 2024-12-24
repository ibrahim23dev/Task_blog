<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserProfile;
class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users=[
            ['name'=>'ibrahim', 'email'=>'inrahim@gmail.com', 'bio'=>'This ssf is bio'],
            ['name'=>'khan', 'email'=>'khan@gmail.com', 'bio'=>'This  ss is bio'],
            ['name'=>'Mujahid', 'email'=>'Mujahid@gmail.com', 'bio'=>'This vvd is bio'],
        ];
        UserProfile::insert($users);
    }
}
