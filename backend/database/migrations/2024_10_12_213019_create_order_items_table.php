<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id(); // Tạo trường id tự tăng
            $table->unsignedBigInteger('order_id'); // Khóa ngoại cho đơn hàng
            $table->unsignedBigInteger('product_variant_id'); // Khóa ngoại cho biến sản phẩm
            $table->unsignedInteger('quantity'); // Số lượng
            $table->decimal('price', 10, 2); // Giá
            $table->timestamps(); // Tạo created_at và updated_at

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
}
