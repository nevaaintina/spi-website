<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceCategory;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Maintenance & Repair',
                'description' => 'Keep your equipment reliable, productive, and ready to operate.',
            ],
            [
                'name' => 'Installation & Commissioning',
                'description' => 'Professional installation and testing to ensure optimal performance.',
            ],
            [
                'name' => 'Overhaul & Rebuild',
                'description' => 'Restore and rebuild equipment to extend its service life.',
            ],
            [
                'name' => 'Inspection & Testing',
                'description' => 'Advanced inspection and testing to detect issues before failure.',
            ],
            [
                'name' => 'Contract & Consulting',
                'description' => 'Long-term strategies and expert consultation to support your business.',
            ],
        ];

        foreach ($categories as $cat) {
            ServiceCategory::firstOrCreate(
                ['slug' => Str::slug($cat['name'])],
                [
                    'name' => $cat['name'],
                    'description' => $cat['description'],
                ]
            );
        }
    }
}