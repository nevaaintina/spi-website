<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\MediaController;
use App\Models\Post;
use App\Http\Controllers\SparePartController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AboutAdminController;

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/featured-services/{slug}', [HomeController::class, 'showFeaturedService'])->name('featured.service.show');

Route::prefix('about')->group(function () {
    Route::get('/', [AboutAdminController::class, 'publicIndex'])->name('about.index');
    
    Route::get('/vision-mission', function () { 
        return Inertia::render('About/VisionMission'); 
    })->name('about.vision');
    
    Route::get('/management', function () { 
        return Inertia::render('About/Management'); 
    })->name('about.management');
});

Route::get('/why-choose-us', function () {
    return Inertia::render('WhyChooseUs');
})->name('why-choose-us');

Route::get('/esg', [AboutAdminController::class, 'publicEsg'])->name('about.esg');
Route::get('/hse', [AboutAdminController::class, 'publicHse'])->name('about.hse');

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/{slug}', [ProductController::class, 'show'])->name('products.show');
});

Route::prefix('services')->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/{slug}', [ServiceController::class, 'show'])->name('services.show');
});

Route::get('/spare-parts', [SparePartController::class, 'index'])->name('spare-parts');

Route::prefix('knowledge')->group(function () {
    Route::get('/', [KnowledgeController::class, 'index'])->name('knowledge.index');
    Route::get('/{slug}', [KnowledgeController::class, 'show'])->name('knowledge.show');
});

Route::get('/media-gallery', [MediaController::class, 'index'])->name('media');
Route::get('/sustainability', function () {
    return Inertia::render('Sustainability');
})->name('sustainability');

Route::get('/career', [CareerController::class, 'index'])->name('career');
Route::get('/career/apply/{id}', function ($id) {
    return Inertia::render('CareerApply', ['id' => $id]);
})->name('career.apply');

Route::get('/contact-us', [ContactController::class, 'index'])->name('contact');
Route::post('/contact/submit', [ContactController::class, 'storeMessage'])->name('contact.submit');


// ==========================================
// 2. ADMIN PANEL / CMS ROUTES
// ==========================================
Route::prefix('admin')->name('admin.')->group(function () {
    
    // ABOUT MANAGER & CMS SUB-SECTIONS (About, ESG, HSE, Management, Customer)
    Route::get('/about-manager', [AboutAdminController::class, 'index'])->name('about.manager');
    
    Route::post('/about/text/update', [AboutAdminController::class, 'updateText'])->name('about.text.update');
    Route::post('/about/esg/update', [AboutAdminController::class, 'updateEsg'])->name('about.esg.update');
    Route::post('/about/hse/update', [AboutAdminController::class, 'updateHse'])->name('about.hse.update');

    Route::post('/about/management/store', [AboutAdminController::class, 'storeManagement'])->name('about.management.store');
    Route::post('/about/management/update/{id}', [AboutAdminController::class, 'updateManagement'])->name('about.management.update');
    Route::delete('/about/management/destroy/{id}', [AboutAdminController::class, 'destroyManagement'])->name('about.management.destroy');

    Route::post('/about/customer/store', [AboutAdminController::class, 'storeCustomer'])->name('about.customer.store');
    Route::post('/about/customer/update/{id}', [AboutAdminController::class, 'updateCustomer'])->name('about.customer.update');
    Route::delete('/about/customer/destroy/{id}', [AboutAdminController::class, 'destroyCustomer'])->name('about.customer.destroy');

    // Dashboard Utama Admin
    Route::get('/', [HomeController::class, 'dashboard'])->name('dashboard');

    // SERVICES CMS MANAGEMENT
    Route::get('/services', [ServiceController::class, 'adminIndex'])->name('services');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::match(['post', 'put'], '/services/{id}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
    Route::post('/services-content', [ServiceController::class, 'updateContent'])->name('services.content.update');

    // PRODUCTS CMS MANAGEMENT
    Route::get('/products', [ProductController::class, 'adminIndex'])->name('products.manager');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::match(['post', 'put'], '/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::post('/products-content', [ProductController::class, 'updateContent'])->name('products.content.update');

    // CAREER ADMIN
    Route::get('/career', [CareerController::class, 'adminIndex'])->name('career');
    Route::post('/jobs', [CareerController::class, 'store'])->name('jobs.store');
    Route::match(['post', 'put'], '/jobs/{id}', [CareerController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{id}', [CareerController::class, 'destroy'])->name('jobs.destroy');
    Route::post('/career/hero/{id}', [CareerController::class, 'updateHero'])->name('career.hero.update');
    Route::post('/career/culture-section', [CareerController::class, 'updateCultureSection'])->name('career.culture-section.update');

    Route::post('/cultures', [CareerController::class, 'storeCulture'])->name('cultures.store');
    Route::put('/cultures/{id}', [CareerController::class, 'updateCulture'])->name('cultures.update');
    Route::delete('/cultures/{id}', [CareerController::class, 'destroyCulture'])->name('cultures.destroy');

    Route::put('/hero/{id}', [HomeController::class, 'updateHero'])->name('hero.update');
    Route::delete('/hero/delete-video/{id}', [HomeController::class, 'destroyHeroVideo'])->name('hero.delete-video');
    Route::put('/intro/{id}', [HomeController::class, 'updateIntro'])->name('intro.update');

    Route::post('/statistics', [HomeController::class, 'storeStatistic'])->name('statistics.store');
    Route::put('/statistics/{id}', [HomeController::class, 'updateStatistic'])->name('statistics.update');
    Route::delete('/statistics/{id}', [HomeController::class, 'destroyStatistic'])->name('statistics.destroy');

    Route::post('/projects', [HomeController::class, 'storeProject'])->name('projects.store');
    Route::put('/projects/{id}', [HomeController::class, 'updateProject'])->name('projects.update');
    Route::delete('/projects/{id}', [HomeController::class, 'destroyProject'])->name('projects.destroy');

    Route::post('/testimonials', [HomeController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::put('/testimonials/{id}', [HomeController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{id}', [HomeController::class, 'destroyTestimonial'])->name('testimonials.destroy');

    Route::post('/posts', [HomeController::class, 'storePost'])->name('posts.store');
    Route::put('/posts/{id}', [HomeController::class, 'updatePost'])->name('posts.update');
    Route::delete('/posts/{id}', [HomeController::class, 'destroyPost'])->name('posts.destroy');

    Route::put('/strength/{id}', [HomeController::class, 'updateStrength'])->name('strength.update');

    Route::put('/featured-section/{id}', [HomeController::class, 'updateFeaturedSection'])->name('featured.section.update');
    Route::post('/featured-items', [HomeController::class, 'storeFeaturedItem'])->name('featured.items.store');
    Route::match(['post', 'put'], '/featured-items/{id?}', [HomeController::class, 'updateFeaturedItem'])->name('featured.items.update');
    Route::delete('/featured-items/{id}', [HomeController::class, 'destroyFeaturedItem'])->name('featured.items.destroy');

    Route::put('/testimonial-section/{id}', [HomeController::class, 'updateTestimonialSection'])->name('testimonial.section.update');
    Route::put('/contact/{id}', [HomeController::class, 'updateContact'])->name('contact.update');

    Route::post('/branches', [HomeController::class, 'storeBranch'])->name('branches.store');
    Route::put('/branches/{id}', [HomeController::class, 'updateBranch'])->name('branches.update');
    Route::delete('/branches/{id}', [HomeController::class, 'destroyBranch'])->name('branches.destroy');

    Route::post('/career/job-section', [CareerController::class, 'updateJobSection'])->name('career.job-section.update');
    Route::post('/career-paths', [CareerController::class, 'storePath'])->name('career-paths.store');
    Route::put('/career-paths/{id}', [CareerController::class, 'updatePath'])->name('career-paths.update');
    Route::delete('/career-paths/{id}', [CareerController::class, 'destroyPath'])->name('career-paths.destroy');
    Route::post('/career/development-section', [CareerController::class, 'updateDevelopmentSection'])->name('career.development-section.update');

    Route::post('/employee-stories', [CareerController::class, 'storeStory'])->name('employee-stories.store');
    Route::match(['post', 'put'], '/employee-stories/{id}', [CareerController::class, 'updateStory'])->name('employee-stories.update');
    Route::delete('/employee-stories/{id}', [CareerController::class, 'destroyStory'])->name('employee-stories.destroy');
    Route::post('/career/story-section', [CareerController::class, 'updateStorySection'])->name('career.story-section.update');

    Route::post('/career/internship-section', [CareerController::class, 'updateInternshipSection'])->name('career.internship-section.update');
    Route::post('/internship-testimonials', [CareerController::class, 'storeInternshipTestimonial'])->name('internship-testimonials.store');
    Route::match(['post', 'put'], '/internship-testimonials/{id}', [CareerController::class, 'updateInternshipTestimonial'])->name('internship-testimonials.update');
    Route::delete('/internship-testimonials/{id}', [CareerController::class, 'destroyInternshipTestimonial'])->name('internship-testimonials.destroy');
    Route::post('/career/application-section', [CareerController::class, 'updateApplicationSection'])->name('career.application-section.update');

    // CONTACT US CMS MANAGEMENT
    Route::get('/contact', [ContactController::class, 'adminIndex'])->name('contact.index');
    Route::post('/contact/hero', [ContactController::class, 'updateHero'])->name('contact.hero.update');
    Route::post('/contact/cards', [ContactController::class, 'updateCards'])->name('contact.cards.update');
    Route::post('/contact/info-section', [ContactController::class, 'updateInfoSection'])->name('contact.info.update');
    Route::delete('/contact/messages/{id}', [ContactController::class, 'destroyMessage'])->name('contact.messages.destroy');

    // KNOWLEDGE CENTER ADMIN
    Route::get('/knowledge', [KnowledgeController::class, 'adminIndex'])->name('knowledge.index');
    Route::post('/knowledge/hero', [KnowledgeController::class, 'updateHero'])->name('knowledge.hero');
    Route::post('/knowledge', [KnowledgeController::class, 'store'])->name('knowledge.store');
    Route::match(['post', 'put'], '/knowledge/{id}', [KnowledgeController::class, 'update'])->name('knowledge.update');
    Route::delete('/knowledge/{id}', [KnowledgeController::class, 'destroy'])->name('knowledge.destroy');

    // MEDIA GALLERY ADMIN
    Route::get('/media', [MediaController::class, 'adminIndex'])->name('media');
    Route::post('/media', [MediaController::class, 'store']);
    Route::delete('/media/{id}', [MediaController::class, 'destroy']);
    
    Route::match(['post', 'put'], '/media-hero', [MediaController::class, 'updateHero'])->name('media.hero.update');
    
    Route::put('/media-statistics/{id}', [MediaController::class, 'updateStatistic']);
    Route::post('/drone-videos', [MediaController::class, 'storeDroneVideo'])->name('drone.store');
    Route::delete('/drone-videos/{id}', [MediaController::class, 'destroyDroneVideo'])->name('drone.destroy');

    // SPARE PARTS & PARTS MANAGER
    Route::get('/spare-parts-manager', [SparePartController::class, 'adminIndex'])->name('parts.manager');
    Route::post('/spare-parts', [SparePartController::class, 'store'])->name('spare-parts.store');
    Route::match(['post', 'put'], '/spare-parts/{id}', [SparePartController::class, 'update'])->name('spare-parts.update');
    Route::delete('/spare-parts/{id}', [SparePartController::class, 'destroy'])->name('spare-parts.destroy');
    Route::post('/exploded-views', [SparePartController::class, 'storeExplodedView'])->name('exploded-views.store');
    Route::delete('/exploded-views/{id}', [SparePartController::class, 'destroyExplodedView'])->name('exploded-views.destroy');
    Route::post('/spare-catalog-file', [SparePartController::class, 'updateCatalogFile'])->name('spare-parts.catalog.update');
    Route::post('/spare-parts-content', [SparePartController::class, 'updateContent'])->name('spare-parts.content.update');

    Route::put('/media-position/{id}', [MediaController::class, 'updatePosition']);
    Route::put('/media-style/{id}', [MediaController::class, 'updateStyle']);
});