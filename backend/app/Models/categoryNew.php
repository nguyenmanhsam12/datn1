<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class categoryNew extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'category_news';
    protected $fillable = [
        'name', 'description'
    ];
    public function news()
    {
        return $this->hasMany(News::class);
    }
}
