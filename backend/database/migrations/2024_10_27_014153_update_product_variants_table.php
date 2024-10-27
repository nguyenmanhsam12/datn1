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
            // Xóa các trường sku, image và price vì đã chuyển sang bảng products
            $table->dropColumn(['sku', 'image', 'price','gallary']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            // Nếu muốn thêm lại các trường này, bạn có thể làm như sau:
            $table->string('sku')->unique()->after('product_id');
            $table->string('image')->nullable()->after('sku');
            $table->decimal('price', 10, 2)->after('image')->nullable();
            $table->json('gallary')->nullable();
        });
    }
};
