<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Tạo trường id tự tăng
            $table->unsignedBigInteger('user_id'); // Khóa ngoại cho user
            $table->string('status'); // Trạng thái đơn hàng
            $table->string('payment_status'); // Trạng thái thanh toán
            $table->decimal('total_amount', 10, 2); // Tổng số tiền
            $table->string('payment_method'); // Phương thức thanh toán
            $table->timestamps(); // Tạo created_at và updated_at

            // Nếu bạn muốn thêm khóa ngoại
          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
