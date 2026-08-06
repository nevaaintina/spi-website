<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Homepage
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// 2. About Us Group
Route::prefix('about')->group(function () {
    Route::get('/', function () { 
        return Inertia::render('About/Index'); 
    })->name('about.index');
    
    Route::get('/vision-mission', function () { 
        return Inertia::render('About/VisionMission'); 
    })->name('about.vision');
    
    Route::get('/management', function () { 
        return Inertia::render('About/Management'); 
    })->name('about.management');
});

// 3. Why Choose Us
Route::get('/why-choose-us', function () {
    return Inertia::render('WhyChooseUs');
})->name('why-choose-us');

// 4. Products & Equipment XCMG Group
Route::prefix('products')->group(function () {
    Route::get('/', function () { 
        return Inertia::render('Products/Index'); 
    })->name('products.index');
    
    Route::get('/{slug}', function ($slug) { 
        return Inertia::render('Products/Show', ['slug' => $slug]); 
    })->name('products.show');
});

// 5. Services Group (Layanan Purna Jual)
Route::prefix('services')->group(function () {
    Route::get('/', function () { 
        return Inertia::render('Services/Index'); 
    })->name('services.index');
    
    Route::get('/{slug}', function ($slug) { 
        return Inertia::render('Services/Show', ['slug' => $slug]); 
    })->name('services.show');
});

// 6. Spare Parts Center
Route::get('/spare-parts', function () {
    return Inertia::render('SpareParts');
})->name('spare-parts');

// 7. Knowledge Center & Company News
Route::prefix('knowledge')->group(function () {
    Route::get('/', function () { 
        return Inertia::render('Knowledge/Index'); 
    })->name('knowledge.index');
    
    Route::get('/{slug}', function ($slug) { 
        return Inertia::render('Knowledge/Show', ['slug' => $slug]); 
    })->name('knowledge.show');
});

// 8. Media Gallery
Route::get('/media-gallery', function () {
    return Inertia::render('Media');
})->name('media');

// 9. Sustainability (ESG, HSE & CSR)
Route::get('/sustainability', function () {
    return Inertia::render('Sustainability');
})->name('sustainability');

// 10. Career
Route::get('/career', function () {
    return Inertia::render('Career');
})->name('career');

// 11. Contact Us
Route::get('/contact-us', function () {
    return Inertia::render('Contact');
})->name('contact');