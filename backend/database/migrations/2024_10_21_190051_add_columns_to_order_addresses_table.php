<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('order_addresses', function (Blueprint $table) {
            $table->string('name')->nullable(); // Tên người nhận
            $table->string('email')->nullable(); // Email người nhận
            $table->string('phone_number')->nullable(); // Số điện thoại người nhận
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_addresses', function (Blueprint $table) {
            //
        });
    }
};
