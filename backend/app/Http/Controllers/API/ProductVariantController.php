<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVariantRequest;
use App\Http\Requests\UpdateVariantRequest;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductVariantController extends Controller
{

    // lấy ra toàn bộ biến thể của tất cả sản phẩm
    public function index()
    {
        try {
            // Lấy danh sách biến thể cùng với thông tin sản phẩm, kích thước, màu sắc
            $variants = ProductVariant::with('product', 'size')->get();

            // Định dạng lại dữ liệu trả về
            $formattedVariants = $variants->map(function ($variant) {
                return [
                    'id' => $variant->id, // ID của biến thể
                    'product_name' => $variant->product->name, // Tên sản phẩm
                    'size' => $variant->size ? $variant->size->size : null, // Kích thước
                    'price' => $variant->product->price, // Giá
                    'stock' => $variant->stock, // Số lượng tồn kho
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu thành công',
                'data' => $formattedVariants,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Lấy danh sách không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    // public function storeVariant(StoreVariantRequest $request)
    // {
    //     try {

    //         Log::info(['variants'], $request->all());

    //         $validatedData = $request->validated();

    //         // Kiểm tra tính duy nhất cho sự kết hợp của product_id, size_id và color_id
    //         $existingVariant = ProductVariant::where('product_id', $request->product_id)
    //             ->where('size_id', $request->size_id)
    //             ->where('color_id', $request->color_id)
    //             ->first();

    //         if ($existingVariant) {
    //             return response()->json([
    //                 'message' => 'Variant with the same product_id, size_id, and color_id already exists.',
    //                 'data' => $existingVariant,
    //             ], 409); // HTTP 409 Conflict
    //         }

    //         $variant = ProductVariant::create([
    //             'product_id' => $validatedData['product_id'],
    //             'size_id' => $validatedData['size_id'],
    //             'color_id' => $validatedData['color_id'],
    //             'sku' => $validatedData['sku'],
    //             'stock' => $validatedData['stock'],
    //             'price' => $validatedData['price'],
    //         ]);

    //         // Xử lý lưu ảnh sản phẩm
    //         $imageFiles = $request->file('image_path'); // Lấy danh sách ảnh từ form

    //         if ($imageFiles) {
    //             foreach ($imageFiles as $index => $image) {

    //                 // Lưu ảnh vào thư mục 'public/products'
    //                 $imagePath = $image->store('products', 'public');

    //                 // Mặc định ảnh đầu tiên là ảnh chính
    //                 $isPrimary = ($index == 0) ? 1 : 0;

    //                 // Lưu thông tin ảnh vào bảng product_images
    //                 ProductImage::create([
    //                     'product_variant_id' => $variant->id,
    //                     'image_path' => $imagePath,
    //                     'is_primary' => $isPrimary,
    //                 ]);
    //             }
    //         }

    //         return response()->json([
    //             'message' => 'Thêm mới thành công',
    //             'data' => $variant,
    //         ], Response::HTTP_CREATED);
    //     } catch (\Throwable $th) {

    //         Log::error(__CLASS__ . '@' . __FUNCTION__, [
    //             'line' => $th->getLine(),
    //             'message' => $th->getMessage(),
    //         ]);

    //         return response()->json([
    //             'message' => 'Thêm mới không thành công'
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    // Hàm này dùng để update 1 biến thể bên trong quản lí variants
    public function updateVariant(UpdateVariantRequest $request, $idVariant)
    {
        try {
            // Tìm biến thể theo ID
            $variant = ProductVariant::findOrFail($idVariant);

            $duplicateVariant = ProductVariant::where('product_id', $variant->product_id)
                ->where('size_id', $request->size_id)
                ->where('id', '!=', $idVariant) // Loại bỏ biến thể hiện tại ra khỏi kết quả
                ->first();

            if ($duplicateVariant) {
                return response()->json([
                    'message' => 'Biến thể này đã tồn tại cho sản phẩm này.',
                ], Response::HTTP_CONFLICT);
            }

        
            // Cập nhật các trường khác
            $variant->size_id = $request->size_id;
            $variant->stock = $request->stock;
            // Lưu biến thể
            $variant->save();

            return response()->json([
                'message' => 'Cập nhật biến thể thành công',
                'data' => $variant,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Cập nhật biến thể không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa 1 biến thể trong quản lí variants
    public function deleteVariant($idVariant)
    {
        try {
            // Tìm biến thể cần xóa theo ID
            $variant = ProductVariant::find($idVariant);

            // Kiểm tra xem biến thể có tồn tại không
            if (!$variant) {
                return response()->json([
                    'message' => 'Biến thể không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }

            // Xóa biến thể
            $variant->delete();

            return response()->json([
                'message' => 'Xóa biến thể thành công',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Log lỗi nếu xảy ra
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Xóa biến thể không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy chi tiết 1 biến thể trong quản lí variants
    public function getDetailVariant($idVariant)
    {
        try {
            // Tìm biến thể theo ID, đồng thời lấy kèm thông tin liên quan đến sản phẩm, size và màu sắc
            $variant = ProductVariant::with('product', 'size')->findOrFail($idVariant);

            // Định dạng dữ liệu để trả về
            $formattedVariant = (object) [
                'id' => $variant->id,
                'product_id' => $variant->product_id,
                'product_name' => $variant->product->name, // Tên sản phẩm
                'size' => (object) [
                    'id' => $variant->size->id,
                    'size' => $variant->size->size, // Tên kích thước
                ],
            ];

            return response()->json([
                'message' => 'Lấy thông tin biến thể thành công',
                'data' => $formattedVariant, // Trả về một đối tượng
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Biến thể không tồn tại',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy thông tin biến thể không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
