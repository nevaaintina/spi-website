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
    Schema::table('career_cultures', function (Blueprint $table) {
        $table->string('badge')->nullable();
        $table->string('title_part1')->nullable();
        $table->string('title_part2')->nullable();
        $table->string('image')->nullable();
        $table->string('stat_text')->nullable();
        $table->string('stat_1_num')->nullable();
        $table->string('stat_1_label')->nullable();
        $table->string('stat_2_num')->nullable();
        $table->string('stat_2_label')->nullable();
        $table->string('stat_3_num')->nullable();
        $table->string('stat_3_label')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('career_cultures', function (Blueprint $table) {
            //
        });
    }
};
