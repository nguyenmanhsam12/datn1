<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Lấy ra danh sách sản phẩm có cả biến thể
    public function index()
    {
        try {
            $products = Product::with('variants.size', 'brand', 'category', 'user', 'variants.color')->get();

            // hàm map là 1 hàm trong eloquent khi trả về 1 collection
            // lấy các thông tin cần thiết
            $productData = $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'brand_id' => $product->brand->name,
                    'category_id' => $product->category->name,
                    'user_id' => $product->user->name,
                    'variants' => $product->variants->map(function ($variant) {
                        return [
                            'id' => $variant->id,
                            'size_id' => $variant->size->size,
                            'color_id' => $variant->color->color,
                            'sku' => $variant->sku,
                            'stock' => $variant->stock,
                            'price' => $variant->price,
                            'image' => asset($variant->image),
                            'gallary' => json_decode($variant->gallary), // Giải mã ảnh phụ từ JSON
                        ];
                    }),
                ];
            });


            return response()->json([
                'message' => 'Lấy danh sách sản phẩm thành công',
                'data' => $productData,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Lấy danh sách sản phẩm không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Thêm sản phẩm với cả biến thể
    public function storeProduct(StoreProductRequest $request)
    {
        try {

            Log::info(['products_variants'], $request->all());

            $validatedData = $request->validated();

            // Tạo sản phẩm mới
            $product = Product::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'brand_id' => $validatedData['brand_id'],
                'category_id' => $validatedData['category_id'],
                'user_id' => auth()->id(),  // ID của người dùng hiện tại
            ]);


            if (!empty($validatedData['variants'])) {
                // Lưu các biến thể của sản phẩm
                foreach ($validatedData['variants'] as $variant) {
                    // Kiểm tra xem biến thể đã tồn tại chưa
                    $existingVariant = ProductVariant::where('product_id', $product->id)
                        ->where('size_id', $variant['size_id'])
                        ->where('color_id', $variant['color_id'])
                        ->first();

                    if ($existingVariant) {

                        Log::warning('Variant already exists', [
                            'product_id' => $product->id,
                            'size_id' => $variant['size_id'],
                            'color_id' => $variant['color_id'],
                            'sku' => $variant['sku']
                        ]);

                        // Nếu biến thể đã tồn tại, bạn có thể quyết định không thêm nữa hoặc cập nhật
                        return response()->json(['message' => 'Variant already exists!'], Response::HTTP_CONFLICT);
                        // continue; // Bỏ qua việc thêm biến thể này
                    }

                    // Lưu hình ảnh chính
                    $imagePath = '';
                    if (isset($variant['image']) && $variant['image'] instanceof UploadedFile) {

                        $image_name = $variant['image']->getClientOriginalName();
                        $extension = $variant['image']->getClientOriginalExtension();
                        $name_extension = $image_name . '_' . time() . '_' . $extension;

                        // Di chuyển ảnh và lưu đường dẫn tương đối
                        $variant['image']->move(public_path('product_image'), $name_extension);

                        $imagePath = 'product_image/' . $name_extension; // Đường dẫn tương đối

                    }

                    // Lưu các ảnh phụ
                    $gallaryPaths = [];
                    // kiểm tra tồn tại và là 1 mảng
                    if (isset($variant['gallary']) && is_array($variant['gallary'])) {
                        foreach ($variant['gallary'] as $image) {
                            if ($image instanceof UploadedFile) {

                                $gallary_name = $image->getClientOriginalName();

                                $gallary_extension = $image->getClientOriginalExtension();

                                $gallary_name_extension = $gallary_name . '_' . time() . '_' . $gallary_extension;

                                // Di chuyển ảnh phụ và lưu đường dẫn tương đối
                                $image->move(public_path('product_images'), $gallary_name_extension);
                                $gallaryPaths[] = 'product_images/' . $gallary_name_extension; // Đường dẫn tương đối
                            }
                        }
                    }

                    // Tạo biến thể mới
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'size_id' => $variant['size_id'],
                        'color_id' => $variant['color_id'],
                        'sku' => $variant['sku'],
                        'stock' => $variant['stock'],
                        'price' => $variant['price'],
                        'image' => $imagePath, // Lưu hình ảnh chính
                        'gallary' => json_encode($gallaryPaths), // Lưu ảnh phụ dưới dạng JSON
                    ]);
                }
            }

            // Tải lại dữ liệu sản phẩm cùng với các biến thể
            $product->load('variants');

            return response()->json([
                'message' => 'Thêm mới thành công',
                'data' => $product,
            ], Response::HTTP_CREATED);
        } catch (\Throwable $th) {

            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Thêm mới không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Thêm mới không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy chi tiết sản phẩm
    public function getDetailProduct($id)
    {
        try {
            $productDetail = Product::findOrFail($id);

            return response()->json([
                'message' => 'Lấy thành công chi tiết sản phẩm',
                'data' => $productDetail,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy chi tiết sản phẩm thất bại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy chi tiết sản phẩm thất bại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Cập nhập sản phẩm
    public function updateProduct(UpdateProductRequest $request, $id)
    {
        try {
            Log::info(['products_detail'], $request->all());

            $product = Product::findOrFail($id);

            $validatedData = $request->validated();

            $product->update([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'brand_id' => $validatedData['brand_id'],
                'category_id' => $validatedData['category_id'],
                'user_id' => auth()->id(),  // ID của người dùng hiện tại
            ]);



            return response()->json([
                'message' => 'Cập nhập thành công',
                'data' => $product,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {

            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Cập nhập không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Cập nhập không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa sản phẩm
    public function deleteProduct($id)
    {
        try {
            // Tìm sản phẩm theo ID
            $product = Product::with('variants')->findOrFail($id);

            // Khởi tạo mảng lưu trữ các ảnh đã xóa
            $imagesToDelete = [];

            // Duyệt qua từng biến thể của sản phẩm
            foreach ($product->variants as $variant) {
                // Thêm ảnh chính vào danh sách xóa
                if ($variant->image && file_exists(public_path($variant->image))) {
                    $imagesToDelete[] = $variant->image; // Đường dẫn ảnh chính
                    unlink(public_path($variant->image)); // Xóa ảnh chính
                }

                // Thêm các ảnh trong gallery vào danh sách xóa
                if ($variant->gallary) {
                    $galleryImages = json_decode($variant->gallary, true);
                    foreach ($galleryImages as $galleryImage) {
                        if ($galleryImage && file_exists(public_path($galleryImage))) {
                            $imagesToDelete[] = $galleryImage; // Đường dẫn ảnh trong gallery
                            unlink(public_path($galleryImage)); // Xóa ảnh trong gallery
                        }
                    }
                }
            }

            // Xóa các bản ghi liên quan (biến thể) và sản phẩm
            $product->variants()->delete(); // Xóa các biến thể liên quan
            $product->delete(); // Xóa sản phẩm

            return response()->json([
                'message' => 'Xóa sản phẩm thành công',
                'deleted_images' => $imagesToDelete // Danh sách ảnh đã xóa
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Xử lý nếu sản phẩm không tìm thấy
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Sản phẩm không tồn tại',
                ], Response::HTTP_NOT_FOUND);
            }

            // Xử lý lỗi khác
            return response()->json([
                'message' => 'Đã xảy ra lỗi, vui lòng thử lại sau',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // lấy sản phẩm biến thể theo id sp
    public function getProductVariants($idProduct)
    {
        try {
            // Truy vấn trực tiếp từ bảng `product_variants` dựa trên `product_id`
            $variants = ProductVariant::with('size', 'color','product')
                ->where('product_id', $idProduct)
                ->get();

            // Kiểm tra nếu không có biến thể nào được tìm thấy
            if ($variants->isEmpty()) {
                return response()->json([
                    'message' => 'Không có biến thể nào cho sản phẩm này',
                ], Response::HTTP_NOT_FOUND);
            }

            // Format lại dữ liệu để trả về
            $formattedVariants = $variants->map(function ($variant) {
                return [
                    'id' => $variant->id,
                    'product_name' => $variant->product->name,
                    'size' => $variant->size->size ?? null, // Tên kích thước
                    'color' => $variant->color->color ?? null, // Tên màu
                    'sku' => $variant->sku,
                    'stock' => $variant->stock,
                    'price' => $variant->price,
                    'image' => asset($variant->image), // Đường dẫn ảnh chính
                    'gallary' => array_map(function ($image) {
                        return asset($image); // Trả về đường dẫn tuyệt đối cho mỗi ảnh phụ
                    }, json_decode($variant->gallary, true) ?? []), // Mảng ảnh phụ
                ];
            });
            // hàm array_map là 1 hàm có sẵn của php
            // nó giống như hàm map trong laravel collection

            return response()->json([
                'success' => true,
                'message' => 'Lấy biến thể thành công',
                'data' => $formattedVariants,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Đã xảy ra lỗi, vui lòng thử lại sau',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
