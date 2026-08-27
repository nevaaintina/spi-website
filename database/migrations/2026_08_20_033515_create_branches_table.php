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
        Schema::create('branches', function (Blueprint $table) {
    $table->id();
    $table->string('name'); // Contoh: "Kalimantan"
    $table->string('type'); // Contoh: "Branch & Workshop"
    $table->text('description');
    $table->string('map_left'); // Posisi persentase X di peta (misal: "67%")
    $table->string('map_top'); // Posisi persentase Y di peta (misal: "-7%")
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
