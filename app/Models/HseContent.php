<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HseContent extends Model
{
    use HasFactory;

    protected $table = 'hse_contents'; // Sesuaikan jika nama tabel di database berbeda
    protected $fillable = ['key', 'value'];
}