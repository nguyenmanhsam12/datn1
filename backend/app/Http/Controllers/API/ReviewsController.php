<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
class ReviewsController extends Controller
{
    public function index(){
        try {
            $review = Review::all();
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
    public function store (Request $request){
        try {
            $data = $request->validate([
                'rating'=>'required|integer|min:1|max:5',
                'comment'=>'required|string|min:1|max:255',
                'product_id'=>'required|exists:products,id',

            ]);
            $userId = $request->user()->id;
            $review = Review::create([
                'user_id' => $userId, 
                'product_id' => $request->product_id,
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);
            return response()->json([
                'message'=>'Thêm mới thành công',
                'data'=>$review,
            ],Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if($th instanceof ValidationException){
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
    public function getDetail($id){
        try {

            $product = Product::findOrFail($id);
            $reviews = $product->reviews()->with('user')->get();
            return response()->json([
                'message' => 'Thành công',
                'data'=>$reviews,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Thất bại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Thất bại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
