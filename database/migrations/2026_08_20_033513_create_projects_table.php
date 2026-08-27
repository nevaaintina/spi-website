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
        Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('title'); // Nama proyek
    $table->text('description');
    $table->string('location'); // Tempat (Contoh: "Jakarta, DKI Jakarta")
    $table->string('year'); // Waktu (Contoh: "2024")
    $table->string('image'); // Foto proyek
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
