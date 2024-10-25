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
        Schema::table('product_images', function (Blueprint $table) {
            if (Schema::hasColumn('product_images', 'product_id')) {
                $table->dropForeign(['product_id']); // Xóa khóa ngoại nếu có
                $table->dropColumn('product_id'); // Xóa cột
            }
            // Thêm cột product_variant_id và thiết lập khóa ngoại
            $table->foreignId('product_variant_id')->constrained('product_variants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_images', function (Blueprint $table) {
            // Xóa khóa ngoại và cột product_variant_id nếu cần
            $table->dropForeign(['product_variant_id']); // Xóa khóa ngoại
            $table->dropColumn('product_variant_id'); // Xóa cột

            // Khôi phục cột product_id nếu cần
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
        });
    }
};
