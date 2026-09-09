<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media_galleries', function (Blueprint $table) {
            $table->string('display_style')->default('cover')->after('position');
        });
    }

    public function down(): void
    {
        Schema::table('media_galleries', function (Blueprint $table) {
            $table->dropColumn('display_style');
        });
    }
};