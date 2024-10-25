<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class WishlistsController extends Controller
{
    public function index() {
        try{
        $wishlists = Wishlist::with('product')->where('user_id', auth()->id())->get();
        return response()->json([
            'message' => 'List danh sách Wishlist thành công',
            'data' => $wishlists,
        ], Response::HTTP_OK);
    } catch (\Throwable $th) {
        Log::error(__CLASS__ . '@' . __FUNCTION__, [
            'line' => $th->getLine(),
            'message' => $th->getMessage(),
        ]);

        if ($th instanceof ModelNotFoundException) {
            return response()->json([
                'message' => 'Lấy danh sách Wishlist không thành công'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'message' => 'Lấy danh sách Wishlist không thành công'
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }

    // Thêm một sản phẩm vào wishlist
    public function storeWishlists(Request $request)
    {
    try {
        // Xác thực dữ liệu đầu vào
        $request->validate([
            'product_id' => 'required|exists:products,id', // Đảm bảo product_id hợp lệ và tồn tại
        ]);

        // Kiểm tra xem sản phẩm đã có trong wishlist của người dùng chưa
        $existingWishlist = Wishlist::where('user_id', auth()->id())
                                    ->where('product_id', $request->product_id)
                                    ->first();

        if ($existingWishlist) {
            return response()->json([
                'message' => 'Sản phẩm này đã có trong danh sách yêu thích'
            ], Response::HTTP_CONFLICT); // Trả về mã lỗi 409 nếu đã tồn tại
        }

        // Tạo mới wishlist nếu sản phẩm chưa có
        $wishlist = Wishlist::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => 'Thêm mới thành công',
            'data' => $wishlist,
        ], Response::HTTP_CREATED);

    } catch (\Throwable $th) {
        Log::error(__CLASS__ . '@' . __FUNCTION__, [
            'line' => $th->getLine(),
            'message' => $th->getMessage(),
        ]);

        if ($th instanceof ValidationException) {
            return response()->json([
                'message' => 'Thêm mới không thành công',
                'errors' => $th->errors(),
            ]);
        }

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


    // Xóa một sản phẩm khỏi wishlist
    public function deleteWishlists($product_id) {
        $wishlist = Wishlist::where('user_id', auth()->id())->where('product_id', $product_id)->first();
        
        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Sản phẩm đã bị xóa khỏi danh sách wishlist']);
        }
        
        return response()->json(['message' => 'Sản phẩm không tìm thấy trong danh sách wishlist'], 404);
    }
}
