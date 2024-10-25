<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index()
    {
        Log::info('Fetching user list'); // Log trước khi lấy dữ liệu

        $data = User::orderBy('id')->paginate(5);
        return response()->json([
            'message' => 'Danh sách người dùng trang' . request('page', 1),
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|min:3',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role_id' => 'required|array',
                'role_id.*' => 'integer|exists:roles,id', // Kiểm tra từng role_id là số nguyên và tồn tại trong bảng roles
            ]);

            $validatedData['password'] = Hash::make($validatedData['password']);

            $user = User::create($validatedData);

            if (isset($validatedData['role_id'])) {
                // Chèn từng role_id vào bảng role_user
                foreach ($validatedData['role_id'] as $roleId) {
                    $user->roles()->attach($roleId);
                }
            }

            return response()->json([
                'message' => 'Thêm mới người dùng thành công',
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
                'message' => 'Thêm mới không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateUser(Request $request, $id)
    {
        try {
            // Lấy người dùng cần cập nhật
            $user = User::findOrFail($id);

            // Validate dữ liệu đầu vào
            $validatedData = $request->validate([
                'name' => 'required|string|min:3',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id, // Không cho phép email trùng lặp trừ email của chính người dùng đang cập nhật
                'password' => 'nullable|string|min:8', // Mật khẩu có thể không bắt buộc (nullable)
                'role_id' => 'required|array',
                'role_id.*' => 'integer|exists:roles,id', // Kiểm tra từng role_id là số nguyên và tồn tại trong bảng roles
            ]);

            Log::info('User', $request->all());

            // Kiểm tra nếu có mật khẩu mới thì mã hóa lại, nếu không giữ mật khẩu cũ
            if (!empty($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            } else {
                unset($validatedData['password']); // Không cập nhật mật khẩu nếu không được gửi lên
            }

            // Cập nhật thông tin người dùng
            $user->update($validatedData);

            // Cập nhật role (sử dụng sync để thay thế toàn bộ roles cũ bằng roles mới)
            if (isset($validatedData['role_id'])) {
                $user->roles()->sync($validatedData['role_id']); // sync sẽ tự động xóa các roles cũ không có trong mảng mới
            }

            return response()->json([
                'message' => 'Cập nhật người dùng thành công',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Kiểm tra lỗi Model không tìm thấy
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Người dùng không tồn tại',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Cập nhật người dùng không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteUser($id)
    {
        try {
            // Tìm kiếm người dùng dựa trên ID
            $user = User::findOrFail($id);

            // Xóa người dùng
            $user->delete();

            // Trả về phản hồi thành công
            return response()->json([
                'message' => 'Xóa người dùng thành công',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Kiểm tra lỗi Model không tìm thấy
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Người dùng không tồn tại',
                ], Response::HTTP_NOT_FOUND);
            }

            // Trả về phản hồi lỗi chung
            return response()->json([
                'message' => 'Xóa người dùng không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function detailUser($id)
    {
        try {
            // Tìm kiếm người dùng dựa trên ID
            $user = User::with('roles')->findOrFail($id);

            // Trả về thông tin chi tiết của người dùng
            return response()->json([
                'user' => $user,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            // Ghi log lỗi
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            // Kiểm tra lỗi Model không tìm thấy
            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Người dùng không tồn tại',
                ], Response::HTTP_NOT_FOUND);
            }

            // Trả về phản hồi lỗi chung
            return response()->json([
                'message' => 'Lấy thông tin người dùng không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
