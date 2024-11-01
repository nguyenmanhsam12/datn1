<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $table ='news';
    protected $fillable =[
        'categoryNew_id','title','content','author','image','status',
    ];
    public function category()
    {
        return $this->belongsTo(categoryNew::class);
    }
}
