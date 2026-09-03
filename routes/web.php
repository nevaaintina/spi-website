<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\MediaController;
use App\Models\Post;

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================

// Homepage
Route::get('/', [HomeController::class, 'index'])->name('home');

// About Us Group
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

// Why Choose Us
Route::get('/why-choose-us', function () {
    return Inertia::render('WhyChooseUs');
})->name('why-choose-us');

// Products & Equipment XCMG Group
Route::prefix('products')->group(function () {
    Route::get('/', function () { 
        return Inertia::render('Products/Index'); 
    })->name('products.index');
    
    Route::get('/{slug}', function ($slug) { 
        return Inertia::render('Products/Show', ['slug' => $slug]); 
    })->name('products.show');
});

// Services Group (Layanan Purna Jual)
Route::prefix('services')->group(function () {
    Route::get('/', function () { 
        return Inertia::render('Services/Index'); 
    })->name('services.index');
    
    Route::get('/{slug}', function ($slug) { 
        return Inertia::render('Services/Show', ['slug' => $slug]); 
    })->name('services.show');
});

// Spare Parts Center
Route::get('/spare-parts', function () {
    return Inertia::render('SpareParts');
})->name('spare-parts');

// Knowledge Center & Company News (Terhubung ke KnowledgeController)
Route::prefix('knowledge')->group(function () {
    Route::get('/', [KnowledgeController::class, 'index'])->name('knowledge.index');
    Route::get('/{slug}', [KnowledgeController::class, 'show'])->name('knowledge.show');
});

// Media Gallery (Publik)
Route::get('/media-gallery', [MediaController::class, 'index'])->name('media');

// Sustainability (ESG, HSE & CSR)
Route::get('/sustainability', function () {
    return Inertia::render('Sustainability');
})->name('sustainability');

// Career (Publik)
Route::get('/career', [CareerController::class, 'index'])->name('career');

// Detail / Form Lamaran Kerja Publik
Route::get('/career/apply/{id}', function ($id) {
    return Inertia::render('CareerApply', ['id' => $id]);
})->name('career.apply');

// Contact Us (Publik)
Route::get('/contact-us', [ContactController::class, 'index'])->name('contact');
Route::post('/contact/submit', [ContactController::class, 'storeMessage'])->name('contact.submit');


// ==========================================
// 2. ADMIN PANEL / CMS ROUTES
// ==========================================
Route::prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard Utama Admin
    Route::get('/', [HomeController::class, 'dashboard'])->name('dashboard');

    // CRUD Lowongan Karir di Admin
    Route::get('/career', [CareerController::class, 'adminIndex'])->name('career');
    Route::post('/jobs', [CareerController::class, 'store'])->name('jobs.store');
    Route::match(['post', 'put'], '/jobs/{id}', [CareerController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{id}', [CareerController::class, 'destroy'])->name('jobs.destroy');

    // Update Hero Banner Career
    Route::post('/career/hero/{id}', [CareerController::class, 'updateHero'])->name('career.hero.update');

    // Section Culture
    Route::post('/career/culture-section', [CareerController::class, 'updateCultureSection'])->name('career.culture-section.update');

    // CRUD Items Our Culture di Admin
    Route::post('/cultures', [CareerController::class, 'storeCulture'])->name('cultures.store');
    Route::put('/cultures/{id}', [CareerController::class, 'updateCulture'])->name('cultures.update');
    Route::delete('/cultures/{id}', [CareerController::class, 'destroyCulture'])->name('cultures.destroy');

    // Update Hero Banner & Hapus Video Hero Homepage
    Route::put('/hero/{id}', [HomeController::class, 'updateHero'])->name('hero.update');
    Route::delete('/hero/delete-video/{id}', [HomeController::class, 'destroyHeroVideo'])->name('hero.delete-video');

    // Update Intro / Layanan
    Route::put('/intro/{id}', [HomeController::class, 'updateIntro'])->name('intro.update');

    // CRUD Statistik Perusahaan
    Route::post('/statistics', [HomeController::class, 'storeStatistic'])->name('statistics.store');
    Route::put('/statistics/{id}', [HomeController::class, 'updateStatistic'])->name('statistics.update');
    Route::delete('/statistics/{id}', [HomeController::class, 'destroyStatistic'])->name('statistics.destroy');

    // CRUD Proyek
    Route::post('/projects', [HomeController::class, 'storeProject'])->name('projects.store');
    Route::put('/projects/{id}', [HomeController::class, 'updateProject'])->name('projects.update');
    Route::delete('/projects/{id}', [HomeController::class, 'destroyProject'])->name('projects.destroy');

    // CRUD Testimoni Customer
    Route::post('/testimonials', [HomeController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::put('/testimonials/{id}', [HomeController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{id}', [HomeController::class, 'destroyTestimonial'])->name('testimonials.destroy');

    // CRUD Berita / Posts
    Route::post('/posts', [HomeController::class, 'storePost'])->name('posts.store');
    Route::put('/posts/{id}', [HomeController::class, 'updatePost'])->name('posts.update');
    Route::delete('/posts/{id}', [HomeController::class, 'destroyPost'])->name('posts.destroy');

    Route::put('/strength/{id}', [HomeController::class, 'updateStrength'])->name('strength.update');

    // Featured Services CMS (Menggunakan match post/put agar aman saat upload file gambar)
    Route::put('/featured-section/{id}', [HomeController::class, 'updateFeaturedSection'])->name('featured.section.update');
    Route::post('/featured-items', [HomeController::class, 'storeFeaturedItem'])->name('featured.items.store');
    Route::match(['post', 'put'], '/featured-items/{id}', [HomeController::class, 'updateFeaturedItem'])->name('featured.items.update');
    Route::delete('/featured-items/{id}', [HomeController::class, 'destroyFeaturedItem'])->name('featured.items.destroy');

    // Testimonials CMS Section & Contact
    Route::put('/testimonial-section/{id}', [HomeController::class, 'updateTestimonialSection'])->name('testimonial.section.update');
    Route::put('/contact/{id}', [HomeController::class, 'updateContact'])->name('contact.update');

    // CRUD Branch Office
    Route::post('/branches', [HomeController::class, 'storeBranch'])->name('branches.store');
    Route::put('/branches/{id}', [HomeController::class, 'updateBranch'])->name('branches.update');
    Route::delete('/branches/{id}', [HomeController::class, 'destroyBranch'])->name('branches.destroy');

    // Section Job Vacancy
    Route::post('/career/job-section', [CareerController::class, 'updateJobSection'])->name('career.job-section.update');

    // CRUD Career Path
    Route::post('/career-paths', [CareerController::class, 'storePath'])->name('career-paths.store');
    Route::put('/career-paths/{id}', [CareerController::class, 'updatePath'])->name('career-paths.update');
    Route::delete('/career-paths/{id}', [CareerController::class, 'destroyPath'])->name('career-paths.destroy');

    // Section Career Development
    Route::post('/career/development-section', [CareerController::class, 'updateDevelopmentSection'])->name('career.development-section.update');

    // CRUD Employee Stories
    Route::post('/employee-stories', [CareerController::class, 'storeStory'])->name('employee-stories.store');
    Route::match(['post', 'put'], '/employee-stories/{id}', [CareerController::class, 'updateStory'])->name('employee-stories.update');
    Route::delete('/employee-stories/{id}', [CareerController::class, 'destroyStory'])->name('employee-stories.destroy');
    
    Route::post('/career/story-section', [CareerController::class, 'updateStorySection'])->name('career.story-section.update');

    // Section Internship Program & Testimonials
    Route::post('/career/internship-section', [CareerController::class, 'updateInternshipSection'])->name('career.internship-section.update');
    Route::post('/internship-testimonials', [CareerController::class, 'storeInternshipTestimonial'])->name('internship-testimonials.store');
    Route::match(['post', 'put'], '/internship-testimonials/{id}', [CareerController::class, 'updateInternshipTestimonial'])->name('internship-testimonials.update');
    Route::delete('/internship-testimonials/{id}', [CareerController::class, 'destroyInternshipTestimonial'])->name('internship-testimonials.destroy');

    Route::post('/career/application-section', [CareerController::class, 'updateApplicationSection'])->name('career.application-section.update');

    // ==========================================
    // CONTACT US CMS MANAGEMENT (Admin)
    // ==========================================
    Route::get('/contact', [ContactController::class, 'adminIndex'])->name('contact.index');
    Route::post('/contact/hero', [ContactController::class, 'updateHero'])->name('contact.hero.update');
    Route::post('/contact/cards', [ContactController::class, 'updateCards'])->name('contact.cards.update');
    Route::post('/contact/info-section', [ContactController::class, 'updateInfoSection'])->name('contact.info.update');
    Route::delete('/contact/messages/{id}', [ContactController::class, 'destroyMessage'])->name('contact.messages.destroy');

    // CRUD Knowledge Center di Admin (Menggunakan match post/put untuk update artikel & hero)
    Route::get('/knowledge', [KnowledgeController::class, 'adminIndex'])->name('knowledge.index');
    Route::post('/knowledge/hero', [KnowledgeController::class, 'updateHero'])->name('knowledge.hero');
    Route::post('/knowledge', [KnowledgeController::class, 'store'])->name('knowledge.store');
    Route::match(['post', 'put'], '/knowledge/{id}', [KnowledgeController::class, 'update'])->name('knowledge.update');
    Route::delete('/knowledge/{id}', [KnowledgeController::class, 'destroy'])->name('knowledge.destroy');

    // ==========================================
    // MEDIA GALLERY CMS MANAGEMENT (Admin)
    // ==========================================
    Route::get('/media', [MediaController::class, 'adminIndex'])->name('media');
    Route::post('/media', [MediaController::class, 'store']);
    Route::delete('/media/{id}', [MediaController::class, 'destroy']);
    Route::put('/media-hero', [MediaController::class, 'updateHero']);
    Route::put('/media-statistics/{id}', [MediaController::class, 'updateStatistic']);
});