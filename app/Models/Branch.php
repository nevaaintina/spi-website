<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'city',
        'description',
        'phone',        // <-- Tambahkan ini agar data hotline bisa tersimpan
        'latitude',
        'longitude',
        'map_left',
        'map_top',
        'map_url',
    ];
}