<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\categoryNew;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CategoryNewController extends Controller
{
    public function index()
    {
        try {
            $categories = categoryNew::all();
            return response()->json([
                'message' => 'Thành công',
                'data' => $categories,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh sách danh mục tin tức tin tức không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh sách danh mục tin tức không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Tạo một danh mục tin tức mới
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $categoryNew = categoryNew::create($request->all());
            return response()->json([
                'message' => 'Tạo danh mục tin tức thành công',
                'data' => $categoryNew,
            ], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            return response()->json([
                'message' => 'Tạo danh mục tin tức không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy thông tin danh mục tin tức theo ID
    public function show($id)
    {
        try {
            $categoryNew = categoryNew::findOrFail($id);
            return response()->json([
                'message' => 'Thành công',
                'data' => $categoryNew,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Danh mục tin tức không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh mục tin tức không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Cập nhật thông tin danh mục tin tức
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $categoryNew = categoryNew::findOrFail($id);
            $categoryNew->update($request->all());
            return response()->json([
                'message' => 'Cập nhật danh mục tin tức thành công',
                'data' => $categoryNew,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Danh mục tin tức không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Cập nhật danh mục tin tức không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa danh mục tin tức
    public function destroy($id)
    {
        try {
            $categoryNew = categoryNew::findOrFail($id);
            $categoryNew->delete();
            return response()->json([
                'message' => 'Xóa thành công',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Danh mục tin tức không tồn tại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Xóa danh mục tin tức không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

// dừng ctrl z /////////////////