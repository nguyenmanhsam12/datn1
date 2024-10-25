<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class OrderAddresses extends Model
{
    use HasFactory;

    protected $table = "order_addresses";
    protected $fillable = ['order_id', 'address_order', 'city', 'name', 'phone_number', 'email', 'note'];

}