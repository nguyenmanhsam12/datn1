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
            
            
            'sku' => 'required|string|max:100|unique:products,sku',
            'image' => 'required|max:2048', 
            'gallary.*' => 'nullable', 
            

            'variants.*.size_id' => 'required|integer|exists:sizes,id',
            'variants.*.stock' => 'required|integer',
            'variants.*.price' => 'required|numeric|min:0',


        ];
    }
}
