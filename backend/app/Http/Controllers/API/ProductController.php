<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\StoreProductVariant;
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
            $products = Product::with('variants.size', 'brand', 'category', 'user')->get();

            // hàm map là 1 hàm trong eloquent khi trả về 1 collection
            // lấy các thông tin cần thiết
            $productData = $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'sku' => $product->sku,
                    'price' => $product->price,
                    'image' => asset($product->image),
                    'brand_id' => $product->brand->name,
                    'category_id' => $product->category->name,
                    'user_id' => $product->user->name,
                    'gallary' => array_map(function ($image) {
                        return asset($image); // Trả về đường dẫn tuyệt đối cho mỗi ảnh phụ
                    }, json_decode($product->gallary, true) ?? []), // Mảng ảnh phụ
                    'variants' => $product->variants->map(function ($variant) {
                        return [
                            'id' => $variant->id,
                            'size_id' => $variant->size->size,
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

            // Lưu hình ảnh chính
            $imagePath = '';
            if (isset($validatedData['image']) && $validatedData['image'] instanceof UploadedFile) {

                $image_name = $validatedData['image']->getClientOriginalName();
                $extension = $validatedData['image']->getClientOriginalExtension();
                $name_extension = $image_name . '_' . time() . '_' . $extension;

                // Di chuyển ảnh và lưu đường dẫn tương đối
                $validatedData['image']->move(public_path('product_image'), $name_extension);

                $imagePath = '/'.'product_image/' . $name_extension;

            }

            // Lưu các ảnh phụ
            $gallaryPaths = [];
            // kiểm tra tồn tại và là 1 mảng
            if (isset($validatedData['gallary']) && is_array($validatedData['gallary'])) {
                foreach ($validatedData['gallary'] as $image) {
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


            // Tạo sản phẩm mới
            $product = Product::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'brand_id' => $validatedData['brand_id'],
                'category_id' => $validatedData['category_id'],
                'price' => $validatedData['price'],
                'sku' => $validatedData['sku'],
                'image' => $imagePath,
                'gallary' => json_encode($gallaryPaths),
                'user_id' => auth()->id(),  // ID của người dùng hiện tại
            ]);


            if (!empty($validatedData['variants'])) {
                // Lưu các biến thể của sản phẩm
                foreach ($validatedData['variants'] as $variant) {
                    // Kiểm tra xem biến thể đã tồn tại chưa
                    $existingVariant = ProductVariant::where('product_id', $product->id)
                        ->where('size_id', $variant['size_id'])
                        ->first();

                    if ($existingVariant) {
                        Log::warning('Variant already exists', [
                            'product_id' => $product->id,
                            'size_id' => $variant['size_id'],
                        ]);

                        // Nếu biến thể đã tồn tại, bạn có thể quyết định không thêm nữa hoặc cập nhật
                        return response()->json(['message' => 'Variant already exists!'], Response::HTTP_CONFLICT);
                        // continue; // Bỏ qua việc thêm biến thể này
                    }


                    // Tạo biến thể mới
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'size_id' => $variant['size_id'],
                        'stock' => $variant['stock'],
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
            $productDetail = Product::with('variants')->findOrFail($id);

            $productDetail->image = asset($productDetail->image);

            // cho phép chuyển đổi 1 mảng thành 1 collection
            $productDetail->gallary = collect(json_decode($productDetail->gallary, true) ?? [])
                ->map(function ($image) {
                    return asset($image); // Đường dẫn tuyệt đối cho mỗi ảnh
                });

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
            Log::debug('Vào hàm updateProduct'); // Thêm log này
            Log::info(['products_update'], $request->all());


            $product = Product::with('variants')->findOrFail($id);

            $validatedData = $request->validated();

            // Kiểm tra và xử lý cập nhật ảnh chính
            $imagePath = $product->image;
            if (isset($validatedData['image']) && $validatedData['image'] instanceof UploadedFile) {
                // Xóa ảnh cũ nếu tồn tại
                if ($imagePath && file_exists(public_path($imagePath))) {
                    unlink(public_path($imagePath));
                }

                // Lưu ảnh mới
                $image_name = $validatedData['image']->getClientOriginalName();
                $extension = $validatedData['image']->getClientOriginalExtension();
                $name_extension = $image_name . '_' . time() . '.' . $extension;
                $validatedData['image']->move(public_path('product_image'), $name_extension);
                $imagePath = 'product_image/' . $name_extension;
            }

            // Kiểm tra và xử lý cập nhật các ảnh phụ
            $gallaryPaths = json_decode($product->gallary, true) ?? [];
            if (isset($validatedData['gallary']) && is_array($validatedData['gallary'])) {
                // Xóa ảnh phụ cũ nếu có
                foreach ($gallaryPaths as $oldPath) {
                    if (file_exists(public_path($oldPath))) {
                        unlink(public_path($oldPath));
                    }
                }

                // Lưu ảnh phụ mới
                $gallaryPaths = [];
                foreach ($validatedData['gallary'] as $image) {
                    if ($image instanceof UploadedFile) {
                        $gallary_name = $image->getClientOriginalName();
                        $gallary_extension = $image->getClientOriginalExtension();
                        $gallary_name_extension = $gallary_name . '_' . time() . '.' . $gallary_extension;
                        $image->move(public_path('product_images'), $gallary_name_extension);
                        $gallaryPaths[] = 'product_images/' . $gallary_name_extension;
                    }
                }
            }

            // Cập nhật thông tin sản phẩm
            $product->update([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'brand_id' => $validatedData['brand_id'],
                'category_id' => $validatedData['category_id'],
                'price' => $validatedData['price'],
                'sku' => $validatedData['sku'],
                'image' => $imagePath,
                'gallary' => json_encode($gallaryPaths),
                'user_id' => auth()->id(),
            ]);

            // Cập nhật hoặc thêm mới biến thể sản phẩm
            if (!empty($validatedData['variants'])) {
                Log::debug('Vào hàm product_variants ');

                foreach ($validatedData['variants'] as $variantData) {
                    // Kiểm tra xem biến thể với size_id mới có tồn tại không
                    $existingVariant = ProductVariant::where('product_id', $product->id)
                        ->where('size_id', $variantData['size_id'])
                        ->first();

                    if ($existingVariant) {
                        // Nếu size_id đã tồn tại, cập nhật stock của biến thể đó
                        $existingVariant->update([
                            'stock' => $variantData['stock'],
                        ]);
                    } else {
                        // Nếu size_id chưa tồn tại, kiểm tra xem biến thể hiện tại có size_id khác không
                        $currentVariant = ProductVariant::where('product_id', $product->id)
                            ->where('size_id', $variantData['size_id'])
                            ->first();

                        if ($currentVariant) {
                            // Nếu có biến thể hiện tại, cập nhật nó
                            $currentVariant->update([
                                'stock' => $variantData['stock'],
                                'size_id' => $variantData['size_id'],
                            ]);
                        } else {
                            // Tạo biến thể mới nếu không tìm thấy
                            ProductVariant::create([
                                'product_id' => $product->id,
                                'size_id' => $variantData['size_id'],
                                'stock' => $variantData['stock'],
                            ]);
                        }
                    }
                }
            }


            // Tải lại dữ liệu sản phẩm cùng với các biến thể
            $product->load('variants');

            return response()->json([
                'message' => 'Cập nhật thành công',
                'data' => $product,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {

            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Cập nhật không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Cập nhật không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // Xóa sản phẩm
    public function deleteProduct($id)
    {
        try {
            // Tìm sản phẩm theo ID
            $product = Product::with('variants')->findOrFail($id);


            // Thêm ảnh chính vào danh sách xóa
            if ($product->image && file_exists(public_path($product->image))) {
                unlink(public_path($product->image)); // Xóa ảnh chính
            }

            // Thêm các ảnh trong gallery vào danh sách xóa
            if ($product->gallary) {
                $galleryImages = json_decode($product->gallary, true);
                foreach ($galleryImages as $galleryImage) {
                    if ($galleryImage && file_exists(public_path($galleryImage))) {
                        unlink(public_path($galleryImage)); // Xóa ảnh trong gallery
                    }
                }
            }
        
            // Xóa các bản ghi liên quan (biến thể) và sản phẩm
            $product->variants()->delete(); // Xóa các biến thể liên quan
            $product->delete(); // Xóa sản phẩm

            return response()->json([
                'message' => 'Xóa sản phẩm thành công',
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

    // lấy tất cả sản phẩm biến thể theo id sp
    public function getProductVariants($idProduct)
    {
        try {
            // Truy vấn trực tiếp từ bảng `product_variants` dựa trên `product_id`
            $variants = ProductVariant::with('size','product')
                ->where('product_id', $idProduct)
                ->get();

            // Kiểm tra nếu không có biến thể nào được tìm thấy
            // hàm isEmpty dùng để kiểm tra xem 1 collection có rỗng hay không
            if ($variants->isEmpty()) {
                return response()->json([
                    'message' => 'Không có biến thể nào cho sản phẩm này',
                ], Response::HTTP_NOT_FOUND);
            }

            // Format lại dữ liệu để trả về
            $formattedVariants = $variants->map(function ($variant) {
                return [
                    'id_variant' => $variant->id,
                    'product_name' => $variant->product->name,
                    'size' => $variant->size->size ?? null, // Tên kích thước
                    'sku' => $variant->product->sku,
                    'stock' => $variant->stock,
                    'price' => $variant->product->price,
                    'image' => asset($variant->product->image), // Đường dẫn ảnh chính
                    'gallary' => array_map(function ($image) {
                        return asset($image); // Trả về đường dẫn tuyệt đối cho mỗi ảnh phụ
                    }, json_decode($variant->product->gallary, true) ?? []), // Mảng ảnh phụ
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

    // thêm 1 sản phẩm biến thể trong quản lí sản phẩm
    public function storeProductVariant(StoreProductVariant $request)
    {
        try {
            // Dữ liệu hợp lệ sẽ có sẵn trong $request sau khi kiểm tra
            
            $validatedData = $request->validated();

            $existingVariant = ProductVariant::where('product_id', $validatedData['product_id'])
                ->where('size_id', $validatedData['size_id'])
                ->first();

            if ($existingVariant) {

                Log::warning('Variant already exists', [
                    'product_id' => $validatedData['product_id'],
                    'size_id' => $validatedData['size_id'],
                ]);

                // Nếu biến thể đã tồn tại, bạn có thể quyết định không thêm nữa hoặc cập nhật
                return response()->json(['message' => 'Variant already exists!'], Response::HTTP_CONFLICT);
                // continue; // Bỏ qua việc thêm biến thể này
            }

            // Tạo biến thể mới
            $variant = ProductVariant::create([
                'product_id' => $validatedData['product_id'],
                'size_id' => $validatedData['size_id'],
                'stock' => $validatedData['stock'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Biến thể đã được thêm thành công.',
                'data' => $variant,
            ], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            // Ghi lỗi vào log
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi, vui lòng thử lại sau.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
