<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVariantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'size_id' => 'required|exists:sizes,id',
            'color_id' => 'required|exists:colors,id',
            'sku' => 'required|string|max:100|unique:product_variants,sku', // Giả sử sku là duy nhất cho mỗi biến thể
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'image_path' => 'required|array|min:1',  // Validate nhiều ảnh
            'image_path.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',  // Mỗi ảnh phải là file ảnh và không quá 2MB
        ];
    }
}
