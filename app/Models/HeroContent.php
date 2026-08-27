<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroContent extends Model
{
    protected $fillable = [
        'badge_text',
        'title_line_1',
        'title_highlight',
        'title_line_2',
        'description',
        'video_url',
        'video_path', // Tambahkan ini agar kolom video upload diizinkan untuk diisi
    ];
}