<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // Melakukan konversi otomatis tipe data JSON dari database ke array PHP
    protected $casts = [
        'specifications' => 'array',
        'key_features' => 'array',
        'gallery_images' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }
}