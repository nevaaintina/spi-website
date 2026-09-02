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
        Schema::create('knowledge_articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->text('excerpt'); // Ringkasan singkat untuk kartu
            $table->longText('content'); // Isi lengkap artikel untuk halaman Show
            $table->string('image')->nullable(); // Thumbnail foto artikel
            $table->string('read_time')->default('5 Menit');
            $table->date('published_date');
            $table->boolean('is_featured')->default(false); // Untuk menandai artikel utama di banner besar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knowledge_articles');
    }
};
