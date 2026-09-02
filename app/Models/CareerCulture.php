<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerCulture extends Model
{
    use HasFactory;

    protected $table = 'career_cultures';

    protected $fillable = [
        'title',
        'description',
        'image',
        'badge',
        'title_part1',
        'title_part2',
        'stat_text',
        'stat_1_num',
        'stat_1_label',
        'stat_2_num',
        'stat_2_label',
        'stat_3_num',
        'stat_3_label',
    ];
}