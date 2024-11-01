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
        Schema::create('news', function (Blueprint $table) {
            $table->id(); // Tạo cột id tự động tăng
            $table->string('title'); // Tiêu đề bài viết
            $table->text('content'); // Nội dung bài viết
            $table->string('author')->nullable(); // Tác giả bài viết
            $table->string('image')->nullable(); // Đường dẫn đến hình ảnh bài viết
            $table->boolean('status')->default(true); // Trạng thái bài viết
            $table->foreignId('categoryNew_id')->constrained('category_news')->onDelete('cascade'); // Khóa ngoại liên kết với bảng categories
            $table->softDeletes();
            $table->timestamps(); // Tạo cột created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
