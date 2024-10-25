<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:255',
            'description' => 'required|string',
            'brand_id' => 'required|integer|exists:brands,id',
            'category_id' => 'required|integer|exists:categories,id',
            'variants.*.size_id' => 'required|integer',
            'variants.*.color_id' => 'required|integer',
            'variants.*.sku' => 'required|string|max:255',
            'variants.*.stock' => 'required|integer',
            'variants.*.price' => 'required|numeric',
            'variants.*.image' => 'required|image|max:2048', // Bắt buộc hình ảnh chính
            'variants.*.gallary.*' => 'nullable|image|max:2048', // Ảnh phụ có thể không bắt buộc
        ];
    }
}
