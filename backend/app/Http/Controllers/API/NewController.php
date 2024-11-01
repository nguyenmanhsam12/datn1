<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class NewController extends Controller
{
    public function index()
    {
        try {
            $news = News::with('category')->get();
            return response()->json([
                'message' => 'Thành công',
                'data' => $news,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Lấy danh sách bài viết không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Tạo một bài viết mới
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu yêu cầu
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'categoryNew_id' => 'required|exists:category_news,id', // Đảm bảo categoryNew_id được yêu cầu
                'author' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Xác thực file ảnh
            ]);
    
            // Xử lý file ảnh
            $imagePath = null;
            if ($request->hasFile('image')) {
                // Lưu file vào thư mục images và lấy đường dẫn
                $imagePath = $request->file('image')->store('images', 'public');
            }
    
            // Tạo bản ghi mới
            $news = News::create([
                'title' => $request->title,
                'content' => $request->content,
                'categoryNew_id' => $request->categoryNew_id,
                'author' => $request->author,
                'image' => $imagePath, // Lưu đường dẫn ảnh vào cơ sở dữ liệu
            ]);
    
            return response()->json([
                'message' => 'Tạo bài viết thành công',
                'data' => $news,
            ], Response::HTTP_CREATED);
    
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);
    
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Danh mục không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }
    
            return response()->json([
                'message' => 'Tạo bài viết không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy thông tin bài viết theo ID
    public function show($id)
    {
        try {
            $news = News::with('category')->findOrFail($id);
            return response()->json([
                'message' => 'Thành công',
                'data' => $news,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Bài viết không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy bài viết không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Cập nhật thông tin bài viết
    public function update(Request $request, $id)
    {
        try {
            // Xác thực dữ liệu yêu cầu
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'categoryNew_id' => 'required|exists:category_news,id', // Đảm bảo category_id được yêu cầu
                'author' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            // Tìm bài viết theo ID
            $news = News::findOrFail($id);
    
            // Xử lý file ảnh
            $imagePath = $news->image; // Giữ nguyên đường dẫn ảnh cũ
            if ($request->hasFile('image')) {
                // Nếu có ảnh mới, lưu và cập nhật đường dẫn
                $imagePath = $request->file('image')->store('images', 'public');
            }
    
            // Cập nhật bản ghi
            $news->update([
                'title' => $request->title,
                'content' => $request->content,
                'categoryNew_id' => $request->categoryNew_id, // Đảm bảo sử dụng đúng tên trường
                'author' => $request->author,
                'image' => $imagePath, // Cập nhật đường dẫn ảnh
            ]);
    
            return response()->json([
                'message' => 'Cập nhật bài viết thành công',
                'data' => $news,
            ], Response::HTTP_OK);
    
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);
    
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Bài viết không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }
    
            return response()->json([
                'message' => 'Cập nhật bài viết không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa bài viết
    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->delete();
            return response()->json([
                'message' => 'Xóa bài viết thành công',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Bài viết không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Xóa bài viết không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
