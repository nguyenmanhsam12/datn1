<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_addresses', function (Blueprint $table) {
            $table->id(); // Tạo trường id tự tăng
            $table->unsignedBigInteger('order_id'); // Khóa ngoại cho đơn hàng
            $table->string('address_order'); // Địa chỉ đặt hàng
            $table->string('city'); // Thành phố
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
        Schema::dropIfExists('order_addresses');
    }
}
