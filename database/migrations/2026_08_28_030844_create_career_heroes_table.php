<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_heroes', function (Blueprint $table) {
            $table->id();
            $table->string('badge_text')->default('CAREER AT SPI');
            $table->string('title_line1')->default('Build Your');
            $table->string('title_line2')->default('Future With Us.');
            $table->text('description');
            $table->string('sub_badge')->default('JOIN OUR TEAM')->nullable();
            $table->string('sub_title')->default('Grow. Contribute. Make an Impact.')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_heroes');
    }
};