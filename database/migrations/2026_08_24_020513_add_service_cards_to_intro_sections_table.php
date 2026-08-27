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
    Schema::table('intro_sections', function (Blueprint $table) {
        $table->string('service_1_title')->nullable();
        $table->text('service_1_desc')->nullable();
        $table->string('service_1_image')->nullable();

        $table->string('service_2_title')->nullable();
        $table->text('service_2_desc')->nullable();
        $table->string('service_2_image')->nullable();

        $table->string('service_3_title')->nullable();
        $table->text('service_3_desc')->nullable();
        $table->string('service_3_image')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('intro_sections', function (Blueprint $table) {
            //
        });
    }
};
