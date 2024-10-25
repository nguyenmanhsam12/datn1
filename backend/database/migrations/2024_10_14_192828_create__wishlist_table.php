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
        Schema::create('wishlists', function (Blueprint $table) {
        $table->id();  // Tự động tăng
        $table->unsignedBigInteger('user_id');  // ID của người dùng
        $table->unsignedBigInteger('product_id');  // ID của sản phẩm
        $table->softDeletes();
        $table->timestamps();  // Thời gian tạo và cập nhật

        // Tạo khóa ngoại
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');  // Xóa wishlist nếu user bị xóa
        $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');  // Xóa wishlist nếu product bị xóa
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_wishlist');
    }
};
