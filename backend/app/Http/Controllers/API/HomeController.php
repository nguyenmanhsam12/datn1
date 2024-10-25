<?php

namespace App\Http\Controllers\API;

use App\Components\Recursive;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    // Tất cả sản phẩm
    public function getAllProduct()
    {
        try {
            // Lấy tất cả sản phẩm cùng với thông tin biến thể chính và hình ảnh
            $products = Product::with(['brand', 'category', 'mainVariant' => function ($query) {
                $query->with('images'); // Lấy cả hình ảnh từ biến thể chính
            }])->limit(12)->get();

            // định dạng lại dữ liệu sẽ được trả về
            // Xử lý từng sản phẩm để trả về thông tin cần thiết
            $productsWithMainVariant = $products->map(function ($product) {
                $mainVariant = $product->mainVariant; // Lấy biến thể chính của sản phẩm
                $primaryImage = $mainVariant ? $mainVariant->images->firstWhere('is_primary', 1) : null; // Lấy hình ảnh chính (is_primary = 1)

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'brand' => $product->brand->name, // Lấy tên thương hiệu
                    'category' => $product->category->name, // Lấy tên danh mục
                    'price' => $mainVariant ? $mainVariant->price : null, // Giá từ biến thể chính
                    'image' => $primaryImage ? $primaryImage->image_path : null // Đường dẫn hình ảnh
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $productsWithMainVariant,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Xử lý ngoại lệ ModelNotFoundException
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh sách không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            // Trả về lỗi không xác định
            return response()->json([
                'message' => 'Lấy danh sách không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // Tất cả danh mục
    public function AllCategory(Recursive $recursive)
    {
        try {

            $list_category = $recursive->getCategoryTree();
            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $list_category,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Xử lý ngoại lệ ModelNotFoundException
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh sách không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            // Trả về lỗi không xác định
            return response()->json([
                'message' => 'Lấy danh sách không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // Chi tiết sản phẩm
    public function getProductBySlug($slug)
    {
        try {
            // Lấy sản phẩm duy nhất có slug tương ứng cùng với tất cả các biến thể và hình ảnh
            $product = Product::with(['brand', 'category', 'variants.images']) // Lấy tất cả các biến thể và hình ảnh
                ->where('slug', $slug)
                ->first(); // Sử dụng first() để lấy một sản phẩm

            // Kiểm tra nếu không có sản phẩm nào được tìm thấy
            if (!$product) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Lấy các sản phẩm liên quan (cùng danh mục, ngoại trừ sản phẩm hiện tại)
            $relatedProducts = Product::with('mainVariant.images') // Lấy các biến thể chính và hình ảnh
                ->where('category_id', $product->category_id) // Cùng danh mục
                ->where('brand_id', $product->brand_id) // Cùng thương hiệu
                ->where('id', '!=', $product->id) // Ngoại trừ sản phẩm hiện tại
                ->take(5) // Giới hạn số lượng sản phẩm liên quan
                ->get();

           
            // Định dạng lại dữ liệu sản phẩm liên quan
            $relatedProductsFormatted = $relatedProducts->map(function ($relatedProduct) {
                $mainVariant = $relatedProduct->mainVariant; // Lấy biến thể chính
                $primaryImage = $mainVariant ? $mainVariant->images->firstWhere('is_primary', 1) : null; // Lấy hình ảnh chính

                return [
                    'id' => $relatedProduct->id,
                    'name' => $relatedProduct->name,
                    'slug' => $relatedProduct->slug,
                    'brand' => $relatedProduct->brand->name,
                    'category' => $relatedProduct->category->name,
                    'price' => $mainVariant ? $mainVariant->price : null,
                    'image' => $primaryImage ? $primaryImage->image_path : null,
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => [
                    'product' => $product,
                    'relatedProducts' => $relatedProductsFormatted,
                ]
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Trả về lỗi không xác định
            return response()->json([
                'message' => 'Lấy chi tiết sản phẩm không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // Sản phẩm dựa theo danh mục
    public function getAllProCate($categorySlug)
    {
        try {
            // Lấy danh mục theo slug và sản phẩm liên quan
            $category = Category::where('slug', $categorySlug)
                ->with(['product.variants.images', 'product.brand'])
                ->first();

            // Kiểm tra nếu không tìm thấy danh mục
            if (!$category) {
                return response()->json([
                    'message' => 'Không tìm thấy danh mục nào.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Lấy danh sách sản phẩm từ quan hệ products trong Category
            $products = $category->product;

            // Kiểm tra nếu không có sản phẩm nào trong danh mục
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào thuộc danh mục này.'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $products,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Lấy danh sách không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // Sản phẩm dựa theo thương hiệu
    public function getAllProBrand($brandSlug)
    {
        try {
            // Lấy danh mục theo slug và sản phẩm liên quan
            $brand = Brand::where('slug', $brandSlug)
                ->with(['product.variants.images', 'product.category'])
                ->first();

            // Kiểm tra nếu không tìm thấy danh mục
            if (!$brand) {
                return response()->json([
                    'message' => 'Không tìm thấy danh mục nào.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Lấy danh sách sản phẩm từ quan hệ products trong Category
            $products = $brand->product;

            // Kiểm tra nếu không có sản phẩm nào trong danh mục
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào thuộc danh mục này.'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $products,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Lấy danh sách không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
