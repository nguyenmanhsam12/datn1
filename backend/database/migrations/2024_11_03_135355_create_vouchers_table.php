<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVouchersTable extends Migration
{
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id(); // Tạo cột id tự động tăng
            $table->string('name'); // Cột name
            $table->string('code', 50)->index(); // Cột code với index
            $table->enum('discount_type', ['percentage', 'fixed']); // Cột discount_type
            $table->decimal('discount_value', 10, 2); // Cột discount_value
            $table->decimal('max_discount_value', 10, 2)->nullable(); // Cột max_discount_value
            $table->timestamp('start_date')->nullable(); // Cột start_date
            $table->timestamp('expiry_date')->nullable(); // Cột expiry_date
            $table->integer('usage_limit')->nullable(); // Cột usage_limit
            $table->decimal('min_order_value', 10, 2)->nullable(); // Cột min_order_value
            $table->enum('status', ['active', 'expired', 'inactive'])->default('active'); // Cột status
            $table->text('description')->nullable(); // Cột description
            $table->integer('created_by')->nullable(); // Cột created_by
            $table->timestamps(); // Tạo cột created_at và updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('vouchers');
    }
}
