<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ColorController extends Controller
{
    public function index(){
        try {
            $colors = Color::all();
            return response()->json([
                'message'=>'Lấy dữ liệu thành công',
                'data'=>$colors,
            ],Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh sách không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh sách không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function storeColor(Request $request){
        try {

            Log::info(['color'],$request->all());

            $data = $request->validate([
                'color'=>'required|string|min:2|max:255|unique:colors,color'
            ]);
            $color = Color::create($data);
            return response()->json([
                'message'=>'Thêm mới thành công',
                'data'=>$color,
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

    public function updateColor(Request $request , $id){
        try {
            $color = Color::findOrFail($id);

            $data = $request->validate([
                'color'=>['required','string','min:2','max:255',Rule::unique('colors')->ignore($color)]
            ]);

            $color->update($data);
            return response()->json([
                'message'=>'Cập nhập thành công',
                'data'=>$color,
            ],Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if($th instanceof ValidationException){
                return response()->json([
                    'message' => 'Cập nhập không thành công',
                    'errors' => $th->errors(),
                ]);
            }
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

    public function deleteColor($id){
        try {
            $color = Color::findOrFail($id);
            $color->delete();
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

    public function getDetailColor($id){
        try {
            $color = Color::findOrFail($id);
          
            return response()->json([
                'message' => 'Thành công',
                'data'=>$color,
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
