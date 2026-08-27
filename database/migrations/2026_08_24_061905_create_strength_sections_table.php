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
    Schema::create('strength_sections', function (Blueprint $table) {
        $table->id();
        $table->string('badge_text')->default('COMPANY STRENGTH');
        $table->string('title_main')->default('Kekuatan Kami,');
        $table->string('title_highlight')->default('Komitmen Kami');
        $table->text('description')->nullable();
        
        // Bagian Banner Bawah (Safety First)
        $table->string('banner_title')->default('Safety First');
        $table->text('banner_desc')->nullable();
        $table->string('banner_image_path')->nullable();

        // 4 Poin Keunggulan Bawah (Mengapa Memilih Kami?)
        $table->string('heading_why')->default('Mengapa Memilih Kami?');
        $table->text('desc_why')->nullable();
        
        foreach([1,2,3,4] as $i) {
            $table->string("point_{$i}_title")->nullable();
            $table->text("point_{$i}_desc")->nullable();
        }
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('strength_sections');
    }
};
