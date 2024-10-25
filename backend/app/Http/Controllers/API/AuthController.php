<?php

namespace App\Http\Controllers\API;

use App\Events\PasswordResetRequested;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;


class AuthController extends Controller
{


    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();

            Log::info('data', $data);


            $data['password'] = Hash::make($data['password']);

            $user = User::create($data);

            // lấy vai trò
            $userRole = Role::where('name', 'user')->first();

            if ($userRole) {
                $user->roles()->attach($userRole->id);
            }

            return response()->json([
                'message' => 'Đăng ký thành công',
                'data' => $user,
            ]);
        } catch (\Throwable $th) {

            return response()->json([
                'errors' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request)
    {
        try {

            $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['Thông tin bạn cung cấp không chính xác']
                ]);
            }

            // Kiểm tra vai trò
            $roles = $user->roles()->pluck('name')->toArray();  //lấy các vai trò của user(nếu nhiều vai trò)

            $token = $user->createToken($user->id)->plainTextToken;

            return response()->json([
                'message' => 'Login Success',
                'token' => $token,
                'roles' => $roles,
                
            ]);
            
        } catch (\Throwable $th) {
            if ($th instanceof ValidationException) {
                return response()->json([
                    'errors' => $th->errors()
                ], Response::HTTP_BAD_REQUEST);
            }

            return response()->json([
                'errors' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout()
    {
        try {
            // currentAccessToken : hàm này tự động lấy ra access_Token truyền lên
            request()->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logout Success'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'erros' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(UpdateUserRequest $request)
    {
        try {
            // Lấy người dùng hiện tại
            $user = $request->user();

            if (!$user) {
                return response()->json(['errors' => 'Người dùng chưa được xác thực.'], Response::HTTP_UNAUTHORIZED);
            }

            // Cập nhật thông tin người dùng
            $user->update($request->validated());

            return response()->json([
                'message' => 'Cập nhật thành công',
                'data' => $user,
            ]);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Cập nhập người dùng không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Cập nhập người dùng không thành công',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function forgotPassword(Request $request)
    {
        try {
            // Validate email
            $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            // Tìm người dùng theo email
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Người dùng không tồn tại',
                ], Response::HTTP_OK);
            }

            // Tạo token reset password
            $token = Str::random(60);

            // Lưu token vào bảng password_resets (token này sẽ được mã hóa)
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $request->email],
                [
                    'email' => $request->email,
                    'token' => Hash::make($token), // mã hóa token
                ]
            );

            // Phát ra event để gửi email
            event(new PasswordResetRequested($user, $token));

            return response()->json([
                'message' => 'Vui lòng kiểm tra email để đặt lại mặt khẩu.',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {

            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ValidationException) {
                return response()->json([
                    'message' => 'Email không đúng hoặc không tồn tại trong hệ thống'
                ], Response::HTTP_BAD_REQUEST);
            }

            return response()->json([
                'message' => 'Có lỗi xảy ra vui lòng thử lại',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'password' => [
                    'required',
                    'confirmed',
                    RulesPassword::min(8) // Ví dụ: mật khẩu tối thiểu 8 ký tự
                        ->letters() //Mật khẩu có ít nhất 1 kí tự
                        ->mixedCase() //Mật khẩu phải có chữ hoa và chữ thường
                        ->numbers() // phải có ít nhất 1 số
                ],
            ]);

            // Lấy token và email từ request
            $token = $request->input('token');
            $email = $request->input('email');

            // Tìm token reset từ bảng password_resets
            $reset = DB::table('password_reset_tokens')
                ->where('email', $email)
                ->first();

            // Kiểm tra nếu không có token trong DB hoặc token không khớp
            if (!$reset || !Hash::check($token, $reset->token)) {
                return response()->json([
                    'message' => 'Token không hợp lệ hoặc đã hết hạn.'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Tìm người dùng theo email
            $user = User::where('email', $email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Người dùng không tồn tại.'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Cập nhật mật khẩu mới
            $user->forceFill([
                'password' => Hash::make($request->password),
                'remember_token' => Str::random(60), // Tạo token mới cho lần đăng nhập sau
            ])->save();

            // Xóa token reset password đã sử dụng
            DB::table('password_reset_tokens')->where('email', $email)->delete();


            return response()->json(['message' => 'Reset mật khẩu thành công.'], Response::HTTP_OK);

        } catch (\Throwable $th) {

            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ValidationException) {
                return response()->json([
                    'message' => 'Các trường validate không hợp lệ'
                ], Response::HTTP_BAD_REQUEST);
            }

            return response()->json([
                'message' => 'Có lỗi xảy ra vui lòng thử lại',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
