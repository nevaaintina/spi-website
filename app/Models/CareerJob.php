<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerJob extends Model
{
    use HasFactory;

    protected $table = 'career_jobs';

    protected $fillable = [
        'title',
        'slug',
        'department',
        'location',
        'type',
        'education',
        'description',
        'requirements',
        'image',
        'is_active',
    ];
}