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
            // Thêm trường mới
            $table->string('image')->nullable(); // Hình ảnh chính
            $table->json('gallary')->nullable(); // Ảnh phụ

            // Xóa bảng product_images nếu cần thiết
            Schema::dropIfExists('product_images');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            // Xóa trường mới nếu rollback
            $table->dropColumn('image');
            $table->dropColumn('gallary');
        });

        // Nếu cần phục hồi bảng product_images
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variant_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }
};
