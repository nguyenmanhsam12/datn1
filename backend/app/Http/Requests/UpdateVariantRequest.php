<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVariantRequest extends FormRequest
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
        $variantsId = $this->route('idVariant');

        return [
            'product_id'=>'required',
            'size_id' => 'required|exists:sizes,id',
            'color_id' => 'required|exists:colors,id',
            // Kiểm tra tính duy nhất cho tổ hợp product_id, size_id, color_id
            'sku' => ['required', 'string', 'max:100', Rule::unique('product_variants')->ignore($variantsId)], // Giả sử sku là duy nhất cho mỗi biến thể
            'stock' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra ảnh chính, tối đa 2MB
            'gallery' => 'nullable|array', // Kiểm tra trường gallery nếu có
            'gallery.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra từng ảnh trong mảng gallery, tối đa 2MB
        ];
    }
}
