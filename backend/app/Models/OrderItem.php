<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = "order_items";
    protected $fillable = ['order_id', 'product_variant_id', 'quantity','price'];

}

