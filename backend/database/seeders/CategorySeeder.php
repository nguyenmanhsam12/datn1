<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Dữ liệu danh mục phân cấp
        $categories = [
            [
                'name' => 'Giày Nam',
                'slug' => 'giay-nam',
                'parent_id' => 0, // Cha
            ],
            [
                'name' => 'Giày Nữ',
                'slug' => 'giay-nu',
                'parent_id' => 0, // Cha
            ],
            [
                'name' => 'Giày Thể Thao',
                'slug' => 'giay-the-thao',
                'parent_id' => 1, // Giày Nam
            ],
            [
                'name' => 'Giày Da',
                'slug' => 'giay-da',
                'parent_id' => 1, // Giày Nam
            ],
            [
                'name' => 'Giày Đi Bộ',
                'slug' => 'giay-di-bo',
                'parent_id' => 2, // Giày Nữ
            ],
            [
                'name' => 'Giày Sneakers',
                'slug' => 'giay-sneakers',
                'parent_id' => 2, // Giày Nữ
            ],
            [
                'name' => 'Giày Sandals',
                'slug' => 'giay-sandals',
                'parent_id' => 2, // Giày Nữ
            ],
        ];

        // Tạo danh mục
        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
