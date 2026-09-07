<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Gunakan firstOrCreate agar tidak error duplicate entry jika data sudah ada
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'), // Pastikan password terisi jika diperlukan
            ]
        );

        // Panggil seeder kategori layanan
        $this->call([
            ServiceSeeder::class,
        ]);
    }
}