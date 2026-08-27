<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntroSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'badge_text',
        'title_main',
        'title_highlight',
        'description',
        'image_path',
        'point_1_title',
        'point_1_desc',
        'point_2_title',
        'point_2_desc',
        'point_3_title',
        'point_3_desc',
        'point_1_image', 
        'point_2_image', 
        'point_3_image',
        // Tambahan untuk 3 Card Layanan Besar
        'service_1_title',
        'service_1_desc',
        'service_1_image',
        'service_2_title',
        'service_2_desc',
        'service_2_image',
        'service_3_title',
        'service_3_desc',
        'service_3_image',
    ];
}