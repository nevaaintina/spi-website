<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerHero extends Model
{
    use HasFactory;

    protected $table = 'career_heroes';

    protected $fillable = [
        'badge_text',
        'title_line1',
        'title_line2',
        'description',
        'sub_badge',
        'sub_title',
        'image', // Pastikan 'image' sudah ada di sini!
    ];
}