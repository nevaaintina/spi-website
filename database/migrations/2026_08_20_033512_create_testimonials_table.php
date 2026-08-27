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
        Schema::create('testimonials', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('company_or_institution'); // Perusahaan/Instansi
    $table->string('role'); // Contoh: "IT Support Intern" atau "Project Manager"
    $table->text('quote'); // Isi testimoni
    $table->string('image')->nullable(); // Foto customer
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
