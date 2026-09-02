<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController; // Digunakan untuk Homepage publik
use App\Models\Post; // Import model Post untuk halaman Knowledge publik

// 1. Homepage (Menggunakan HomeController untuk data dinamis dari database)
Route::get('/', [HomeController::class, 'index'])->name('home');

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
        return Inertia::render('Knowledge/Index', [
            'posts' => Post::latest()->get(),
        ]); 
    })->name('knowledge.index');
    
    // Gunakan Route Model Binding ({post:slug})
    Route::get('/{post:slug}', function (Post $post) { 
        return Inertia::render('Knowledge/Show', [
            'post' => $post,
            'recentPosts' => Post::where('id', '!=', $post->id)->latest()->take(3)->get(),
        ]); 
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

// untuk detail/lamaran kerja
Route::get('/career/apply/{id}', function ($id) {
    return Inertia::render('CareerApply', ['id' => $id]);
})->name('career.apply');


// ==========================================
// 12. ADMIN PANEL / CMS ROUTES
// ==========================================
Route::prefix('admin')->name('admin.')->group(function () {
    // Halaman Utama Dashboard Admin
    Route::get('/', [HomeController::class, 'dashboard'])->name('dashboard');

    // Update Hero Banner & Hapus Video Hero
    Route::put('/hero/{id}', [HomeController::class, 'updateHero'])->name('hero.update');
    Route::delete('/hero/delete-video/{id}', [HomeController::class, 'destroyHeroVideo'])->name('hero.delete-video');

    // Update Intro / Layanan
    Route::put('/intro/{id}', [HomeController::class, 'updateIntro'])->name('intro.update');

    // CRUD Statistik Perusahaan
    Route::post('/statistics', [HomeController::class, 'storeStatistic'])->name('statistics.store');
    Route::put('/statistics/{id}', [HomeController::class, 'updateStatistic'])->name('statistics.update');
    Route::delete('/statistics/{id}', [HomeController::class, 'destroyStatistic'])->name('statistics.destroy');

    // CRUD Proyek (Project Gallery)
    Route::post('/projects', [HomeController::class, 'storeProject'])->name('projects.store');
    Route::put('/projects/{id}', [HomeController::class, 'updateProject'])->name('projects.update');
    Route::delete('/projects/{id}', [HomeController::class, 'destroyProject'])->name('projects.destroy');

    // CRUD Testimoni Customer
    Route::post('/testimonials', [HomeController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::put('/testimonials/{id}', [HomeController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{id}', [HomeController::class, 'destroyTestimonial'])->name('testimonials.destroy');

    // CRUD Berita / Posts / Knowledge Center
    Route::post('/posts', [HomeController::class, 'storePost'])->name('posts.store');
    Route::put('/posts/{id}', [HomeController::class, 'updatePost'])->name('posts.update');
    Route::delete('/posts/{id}', [HomeController::class, 'destroyPost'])->name('posts.destroy');

    Route::put('/strength/{id}', [HomeController::class, 'updateStrength'])->name('strength.update');

    // Featured Services CMS
    Route::put('/featured-section/{id}', [HomeController::class, 'updateFeaturedSection'])->name('featured.section.update');
    Route::post('/featured-items', [HomeController::class, 'storeFeaturedItem'])->name('featured.items.store');
    Route::put('/featured-items/{id}', [HomeController::class, 'updateFeaturedItem'])->name('featured.items.update');
    Route::delete('/featured-items/{id}', [HomeController::class, 'destroyFeaturedItem'])->name('featured.items.destroy');

    // Testimonials CMS Section & Contact
    Route::put('/testimonial-section/{id}', [HomeController::class, 'updateTestimonialSection'])->name('testimonial.section.update');
    Route::put('/contact/{id}', [HomeController::class, 'updateContact'])->name('contact.update');

    // CRUD Branch Office & Area Operasional (Lengkap dengan Store, Update, Destroy)
    Route::post('/branches', [HomeController::class, 'storeBranch'])->name('branches.store');
    Route::put('/branches/{id}', [HomeController::class, 'updateBranch'])->name('branches.update');
    Route::delete('/branches/{id}', [HomeController::class, 'destroyBranch'])->name('branches.destroy');
});