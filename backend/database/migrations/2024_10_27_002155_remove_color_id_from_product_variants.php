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
        Schema::table('product_variants', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['color_id']);
            // Then drop the column
            $table->dropColumn('color_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            // Add the column back
            $table->foreignId('color_id')->constrained('colors')->onDelete('cascade');
        });
    }
};
