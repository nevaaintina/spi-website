<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('featured_service_sections', function (Blueprint $table) {
        $table->id();
        $table->string('badge_text')->default('OUR SERVICES');
        $table->string('title_main')->default('Featured');
        $table->string('title_highlight')->default('Services');
        $table->text('description')->nullable();
        $table->string('bg_image_path')->nullable(); // Gambar latar belakang section
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('featured_service_sections');
    }
};
