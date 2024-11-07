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
    // lấy tất cả sp
    public function allProduct()
    {
        try {
            // Lấy các sản phẩm ra trang home với 8 sản phẩm mới nhất
            $products = Product::with(['brand', 'category', 'variants'])
                ->orderBy('id', 'desc')
                ->get();

            // Xử lý từng sản phẩm để trả về thông tin cần thiết
            $formatProductHome = $products->map(function ($product) {
                // Tìm biến thể có giá thấp nhất
                $cheapestVariant = $product->variants->isNotEmpty()
                    ? $product->variants->sortBy('price')->first()
                    : null;

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'sku' => $product->sku,
                    'brand_id' => $product->brand->id,
                    'brand' => $product->brand->name, // Lấy tên thương hiệu
                    'category' => $product->category->name, // Lấy tên danh mục
                    'category_id' => $product->category->id,
                    'image' => asset($product->image),
                    'variant' => $cheapestVariant ? [
                        'size' => $cheapestVariant->size->size,
                        'price' => $cheapestVariant->price,
                        'stock' => $cheapestVariant->stock,
                    ] : null, // Lấy biến thể có giá thấp nhất
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $formatProductHome,
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

    // lấy sản phẩm ra trang home 8 sp mới nhất
    public function getAllProduct()
    {
        try {
            // Lấy các sản phẩm ra trang home với 8 sản phẩm mới nhất
            $products = Product::with(['brand', 'category', 'variants'])
                ->orderBy('id', 'desc')
                ->limit(8) // Giới hạn số lượng sản phẩm
                ->get();

            // Xử lý từng sản phẩm để trả về thông tin cần thiết
            $formatProductHome = $products->map(function ($product) {
                // Tìm biến thể có giá thấp nhất
                $cheapestVariant = $product->variants->isNotEmpty()
                    ? $product->variants->sortBy('price')->first()
                    : null;

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'sku' => $product->sku,
                    'brand_id' => $product->brand->id,
                    'brand' => $product->brand->name, // Lấy tên thương hiệu
                    'category' => $product->category->name, // Lấy tên danh mục
                    'category_id' => $product->category->id,
                    'image' => asset($product->image),
                    'variant' => $cheapestVariant ? [
                        'size' => $cheapestVariant->size->size,
                        'price' => $cheapestVariant->price,
                        'stock' => $cheapestVariant->stock,
                    ] : null, // Lấy biến thể có giá thấp nhất
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $formatProductHome,
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
            $product = Product::with(['brand', 'category', 'variants.size']) // Lấy tất cả các biến thể và hình ảnh
                ->where('slug', $slug)
                ->first(); // Sử dụng first() để lấy một sản phẩm

            // Kiểm tra nếu không có sản phẩm nào được tìm thấy
            if (!$product) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Tính giá tiền nhỏ nhất và lớn nhất từ các biến thể
            $prices = $product->variants->pluck('price');
            $minPrice = $prices->min();
            $maxPrice = $prices->max();

            $productFormatted = (object)[
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'sku' => $product->sku,
                'brand' => $product->brand->name,
                'category' => $product->category->name,
                'minPrice' => $minPrice,
                'maxPrice' => $maxPrice,
                'image' => asset($product->image),
                'gallary' => collect(json_decode($product->gallary))
                    ->map(function ($image) {
                        return asset($image);
                    }),
                'variants' => $product->variants->map(function ($variant) {
                    return [
                        'id' => $variant->id,
                        'size' => $variant->size->size,
                        'stock' => $variant->stock,
                        'price' => $variant->price,
                    ];
                })
            ];


            

            // Lấy các sản phẩm liên quan (cùng danh mục, ngoại trừ sản phẩm hiện tại)
            $relatedProducts = Product::with('variants') // Lấy các biến thể chính và hình ảnh
                ->where('category_id', $product->category_id) // Cùng danh mục
                ->where('brand_id', $product->brand_id) // Cùng thương hiệu
                ->where('id', '!=', $product->id) // Ngoại trừ sản phẩm hiện tại
                ->take(4) // Giới hạn số lượng sản phẩm liên quan
                ->get();


            // Định dạng lại dữ liệu sản phẩm liên quan
            $relatedProductsFormatted = $relatedProducts->map(function ($relatedProduct) {
                return [
                    'id' => $relatedProduct->id,
                    'name' => $relatedProduct->name,
                    'slug' => $relatedProduct->slug,
                    'brand' => $relatedProduct->brand->name,
                    'category' => $relatedProduct->category->name,
                    'price' => $relatedProduct->price,
                    'sku' => $relatedProduct->sku,
                    'image' => asset($relatedProduct->image),
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => [
                    'product' => $productFormatted,
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
    // Sản phẩm dựa theo danh mục trên trang home lấy 8 sp mới nhất
    public function getAllProCate($categorySlug)
    {
        try {
            // Lấy danh mục theo slug và sản phẩm liên quan
            $category = Category::where('slug', $categorySlug)
                ->with(['product.variants', 'product.brand'])
                ->first();

            // Kiểm tra nếu không tìm thấy danh mục
            if (!$category) {
                return response()->json([
                    'message' => 'Không tìm thấy danh mục nào.'
                ], Response::HTTP_NOT_FOUND);
            }


            // Lấy danh sách sản phẩm từ quan hệ products trong Category, giới hạn 8 sản phẩm mới nhất
            $products = $category->product()->orderBy('id', 'desc')->limit(8)->get();

            // Kiểm tra nếu không có sản phẩm nào trong danh mục
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào thuộc danh mục này.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Xử lý từng sản phẩm để trả về thông tin cần thiết
            $formatProductHome = $products->map(function ($product) {
                // Tìm biến thể có giá thấp nhất
                $cheapestVariant = $product->variants->isNotEmpty()
                    ? $product->variants->sortBy('price')->first()
                    : null;

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'sku' => $product->sku,
                    'brand_id' => $product->brand->id,
                    'brand' => $product->brand->name, // Lấy tên thương hiệu
                    'category' => $product->category->name, // Lấy tên danh mục
                    'category_id' => $product->category->id,
                    'image' => asset($product->image),
                    'variant' => $cheapestVariant ? [
                        'size' => $cheapestVariant->size->size,
                        'price' => $cheapestVariant->price,
                        'stock' => $cheapestVariant->stock,
                    ] : null, // Lấy biến thể có giá thấp nhất
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $formatProductHome,
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
                ->with(['product.variants', 'product.category'])
                ->first();

            // Kiểm tra nếu không tìm thấy danh mục
            if (!$brand) {
                return response()->json([
                    'message' => 'Không tìm thấy danh mục nào.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Lấy danh sách sản phẩm từ quan hệ products trong brands
            $products = $brand->product;

            // Kiểm tra nếu không có sản phẩm nào trong thương hiệu
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào thuộc thương hiệu này.'
                ], Response::HTTP_NOT_FOUND);
            }

            $formatProductHome = $products->map(function ($product) {
                // Tìm biến thể có giá thấp nhất
                $cheapestVariant = $product->variants->isNotEmpty()
                    ? $product->variants->sortBy('price')->first()
                    : null;

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'sku' => $product->sku,
                    'brand_id' => $product->brand->id,
                    'brand' => $product->brand->name, // Lấy tên thương hiệu
                    'category' => $product->category->name, // Lấy tên danh mục
                    'category_id' => $product->category->id,
                    'image' => asset($product->image),
                    'variant' => $cheapestVariant ? [
                        'size' => $cheapestVariant->size->size,
                        'price' => $cheapestVariant->price,
                        'stock' => $cheapestVariant->stock,
                    ] : null, // Lấy biến thể có giá thấp nhất
                ];
            });



            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $formatProductHome,
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


    // lấy tất cả sản phẩm dựa theo danh mục
    public function allProductCategory($categorySlug)
    {
        try {
            // Lấy danh mục theo slug và sản phẩm liên quan
            $category = Category::where('slug', $categorySlug)
                ->with(['product.variants', 'product.brand'])
                ->first();

            // Kiểm tra nếu không tìm thấy danh mục
            if (!$category) {
                return response()->json([
                    'message' => 'Không tìm thấy danh mục nào.'
                ], Response::HTTP_NOT_FOUND);
            }


            // Lấy danh sách sản phẩm từ quan hệ products trong Category, giới hạn 8 sản phẩm mới nhất
            $products = $category->product;
            // Kiểm tra nếu không có sản phẩm nào trong danh mục
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm nào thuộc danh mục này.'
                ], Response::HTTP_NOT_FOUND);
            }

            $formatProductHome = $products->map(function ($product) {
                // Tìm biến thể có giá thấp nhất
                $cheapestVariant = $product->variants->isNotEmpty()
                    ? $product->variants->sortBy('price')->first()
                    : null;

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'sku' => $product->sku,
                    'brand_id' => $product->brand->id,
                    'brand' => $product->brand->name, // Lấy tên thương hiệu
                    'category' => $product->category->name, // Lấy tên danh mục
                    'category_id' => $product->category->id,
                    'image' => asset($product->image),
                    'variant' => $cheapestVariant ? [
                        'size' => $cheapestVariant->size->size,
                        'price' => $cheapestVariant->price,
                        'stock' => $cheapestVariant->stock,
                    ] : null, // Lấy biến thể có giá thấp nhất
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $formatProductHome,
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
