<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class BrandController extends Controller
{
    public function index(){
        try {
            $brands = Brand::all();
            return response()->json([
                'message'=>'Lấy dữ liệu thành công',
                'data'=>$brands,
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

    public function storeBrand(Request $request){
        try {
            $data = $request->validate([
                'name'=>'required|string|min:4|max:255|unique:brands,name'
            ]);
            $brand = Brand::create($data);
            return response()->json([
                'message'=>'Thêm mới thành công',
                'data'=>$brand,
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

    public function updateBrand(Request $request , $id){
        try {
            $brand = Brand::findOrFail($id);

            $data = $request->validate([
                'name'=>['required','string','min:4','max:255',Rule::unique('brands')->ignore($brand)]
            ]);

            $brand->update($data);
            return response()->json([
                'message'=>'Cập nhập thành công',
                'data'=>$brand,
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

    public function deleteBrand($id){
        try {
            $brand = Brand::findOrFail($id);
            $brand->delete();
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

    public function getDetailBrand($id){
        try {
            $brand = Brand::findOrFail($id);
          
            return response()->json([
                'message' => 'Thành công',
                'data'=>$brand,
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
