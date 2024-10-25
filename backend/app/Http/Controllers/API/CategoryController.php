<?php

namespace App\Http\Controllers\API;

use App\Components\Recursive;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    protected $recursive;

    public function __construct(Recursive $recursive)
    {
        $this->recursive = $recursive;
    }

    public function index()
    {
        try {
            $categories = Category::all();
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
                    'message' => 'Lấy danh sách danh mục không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh sách danh mục không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // lấy ra danh sách danh mục theo dạng cây danh mục
    public function create()
    {
        try {
            $data = $this->recursive->getCategoryTree();
            return response()->json([
                'message' => 'Thành công',
                'data' => $data,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh sách danh mục không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh sách danh mục không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(CategoryRequest $request)
    {
        try {

            Log::info('Parent ID:', ['parent_id' => $request->parent_id]);

            $category = Category::create([
                'name' => $request->name,
                'parent_id' => $request->parent_id
            ]);

            return response()->json([
                'message' => 'Thêm mới danh mục thành công',
                'data' => $category,
            ], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Thêm mới danh mục thất bại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Thêm mới danh mục thất bại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        try {

            Log::info('id',['id'=>$id]);

            $category = Category::findOrFail($id);

            $category->update([
                'name' => $request->name,
                'parent_id' => $request->parent_id
            ]);

            return response()->json([
                'message' => 'Cập nhập danh mục thành công',
                'data' => $category,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Cập nhập danh mục thất bại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Cập nhập danh mục thất bại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
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
                    'message' => 'Xóa danh mục thất bại'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Xóa danh mục thất bại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getDetailCategory($id)
    {
        try {
            // Lấy danh mục theo ID
            $category = Category::findOrFail($id);

            // Lấy danh mục cha nếu có
            $parentCategory = null;

            if($category->parent_id > 0 ){
                $parentCategory =  Category::find($category->parent_id);
            }

            return response()->json([
                'message' => 'Thành công',
                'data' => [
                    'category' => $category,
                    'parent_category' => $parentCategory,
                ],
            ], Response::HTTP_OK);
            
        } catch (\Throwable $th) {
            Log::error(__CLASS__ . '@' . __FUNCTION__, [
                'line' => $th->getLine(),
                'message' => $th->getMessage(),
            ]);

            if ($th instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Lấy danh mục không thành công'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Lấy danh mục không thành công'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
