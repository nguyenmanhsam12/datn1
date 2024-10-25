<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ReviewAdminController extends Controller
{
    public function index(){
        try {
            $review = Review::with('user','product')->get();
            return response()->json([
                'message' => 'Thành công',
                'data' => $review,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh sách đánh giá không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh sách đánh giá không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function deleteReview($id){
        try {
            $review = Review::findOrFail($id);
            $review->delete();
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
                    'message' => 'Xóa thất bại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Xóa thất bại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
}
