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
    Schema::create('intro_sections', function (Blueprint $table) {
        $table->id();
        $table->string('badge_text')->default('LAYANAN KAMI');
        $table->string('title_main');
        $table->string('title_highlight');
        $table->text('description');
        $table->string('image_path')->nullable();
        
        // 3 Poin Keunggulan Horizontal di bawah deskripsi
        $table->string('point_1_title')->nullable();
        $table->text('point_1_desc')->nullable();
        $table->string('point_2_title')->nullable();
        $table->text('point_2_desc')->nullable();
        $table->string('point_3_title')->nullable();
        $table->text('point_3_desc')->nullable();
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intro_sections');
    }
};
