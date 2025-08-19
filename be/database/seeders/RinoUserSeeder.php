<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RinoUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Membuat user rino dengan password sijilorotelu
     *
     * @return void
     */
    public function run()
    {
        // Cek apakah user rino sudah ada
        $existingUser = User::where('username', 'rino')->first();
        
        if (!$existingUser) {
            User::create([
                'username' => 'rino',
                'name' => 'Rino',
                'email' => 'rino@gmail.com',
                'password' => Hash::make('sijilorotelu'), // Password: sijilorotelu
            ]);
            
        } else {
            $this->command->info('Rino user already exists.');
        }
    }
}
