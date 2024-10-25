<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class RoleController extends Controller
{
    public function index(){
        try {
            $roles = Role::all();
            return response()->json([
                'message'=>'Lấy dữ liệu thành công',
                'data'=>$roles,
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

    public function storeRoles(Request $request){
        try {
            $data = $request->validate([
                'name'=>'required|string|min:4|max:255|unique:roles,name',
                'display_name'=> 'required|string|min:4|max:255',
            ]);

            $role = Role::create($data);

            return response()->json([
                'message'=>'Thêm mới thành công',
                'data'=>$role,
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

    public function updateRoles(Request $request , $id){
        try {
            $role = Role::findOrFail($id);

            $data = $request->validate([
                'name'=>['required','string','min:4','max:255',Rule::unique('roles')->ignore($role)],
                'display_name'=> 'required|string|min:4|max:255'
            ]);

            $role->update($data);
            return response()->json([
                'message'=>'Cập nhập thành công',
                'data'=>$role,
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

    public function deleteRole($id){
        try {
            $role = Role::findOrFail($id);
            $role->delete();
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

    public function getDetailRole($id){
        try {
            $role = Role::findOrFail($id);
          
            return response()->json([
                'message' => 'Thành công',
                'data'=>$role,
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
