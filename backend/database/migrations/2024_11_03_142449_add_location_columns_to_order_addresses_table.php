<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationColumnsToOrderAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_addresses', function (Blueprint $table) {
            $table->integer('province_id')->nullable(); // Thêm cột province_id
            $table->integer('district_id')->nullable(); // Thêm cột district_id
            $table->integer('ward_id')->nullable(); // Thêm cột ward_id
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_addresses', function (Blueprint $table) {
            $table->dropColumn(['province_id', 'district_id', 'ward_id']); // Xóa các cột khi rollback
        });
    }
}
