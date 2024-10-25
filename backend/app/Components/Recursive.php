<?php

namespace App\Components;

use App\Models\Category;

class Recursive{

    public function getCategoryTree($parentId = 0){
        
        $categories = Category::where('parent_id',$parentId)->get();
        
        $categoryTree = [];

        foreach($categories as $category){
            $categoryTree[] = [
                'id'=>$category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'parent_id' => $category->parent_id,
                'children' => $this->getCategoryTree($category->id),
            ];
        }

        return $categoryTree;

    }
}

?>