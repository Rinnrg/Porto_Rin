<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Membuat user admin default untuk testing
     *
     * @return void
     */
    public function run()
    {
        // Cek apakah admin sudah ada
        $existingAdmin = User::where('username', 'admin')->first();
        
        if (!$existingAdmin) {
            User::create([
                'username' => 'admin',
                'name' => 'Administrator',
                'email' => 'admin@example.com',
                'password' => Hash::make('123456'), // Password: 123456
            ]);
            
            $this->command->info('Admin user created successfully!');
            $this->command->info('Username: admin');
            $this->command->info('Password: 123456');
        } else {
            $this->command->info('Admin user already exists.');
        }
    }
}
