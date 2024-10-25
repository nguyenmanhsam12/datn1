<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();   //lấy thông tin đăng nhập
        // kiểm tra xem có admin trong tài khoản đó không
        if($user && $user->roles->contains('name','admin')){
            return $next($request);
        }

        return response()->json(['error' => 'Bạn không có quyền truy cập'],403); // Trả về lỗi nếu không phải admin
    }
}
