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
        Schema::create('hero_contents', function (Blueprint $table) {
    $table->id();
    $table->string('badge_text')->default('PT. SERVISTAMA PRO INDONESIA');
    $table->string('title_line_1'); // Contoh: "DENGAN KONSEP"
    $table->string('title_highlight'); // Contoh: "BRIGHT FUTURE"
    $table->string('title_line_2'); // Contoh: "UNTUK ANDA"
    $table->text('description');
    $table->string('video_url'); // Link YouTube atau path video
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_contents');
    }
};
