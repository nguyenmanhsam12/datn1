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
        Schema::table('products', function (Blueprint $table) {
            // Thêm trường sku nếu chưa có
            $table->string('sku')->unique()->after('description')->nullable();
            
            // Thêm trường image nếu chưa có
            $table->string('image')->nullable()->after('sku');
            
            // Thêm trường gallary nếu chưa có
            $table->json('gallary')->nullable()->after('image');

            // Thêm trường price nếu chưa có
            $table->decimal('price', 10, 2)->after('gallary')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Xóa các trường đã thêm
            $table->dropColumn(['sku', 'image', 'gallary','price']);
        });
    }
};
