<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory , HasSlug ;

    protected $table = 'products';

    protected $fillable = ['name','slug','description','price','brand_id','category_id','user_id'];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name') // Tạo slug từ trường 'name'
            ->saveSlugsTo('slug'); // Lưu vào trường 'slug'
    }

    // lấy ra 1 sản phẩm chính của biến thể
    public function mainVariant(){
        return $this->hasOne(ProductVariant::class)->orderBy('price','asc');
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
    
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
