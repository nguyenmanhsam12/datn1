<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Resources\CartCollection;
use App\Models\Cart;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $cart;

    public function __construct(Cart $cart)
    {
        $this->cart = $cart;
    }

    public function index(Request $request)
    {
        $page = $request->limit ?? 5;
        $user = auth()->user();
        $carts = Cart::getPaginatedCarts($page, $user->id);
        return new CartCollection($carts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CartRequest $request)
    {
        try {
            $user = auth()->user();
            $product = ProductVariant::findOrFail($request->product_variant_id);
            $cartItem = $this->cart->addOrUpdateCartItem($user->id, $product, $request->quantity);

            return response()->json([
                'message' => 'Sản phẩm đã được thêm vào giỏ hàng!',
                'cart_item' => $cartItem,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request)
    {

    }

    public function updateCart(Request $request)
    {
        $user = auth()->user();
        $cartItemsData = $request->input('cart_items');
        $cartItemIdsToDelete = $request->input('cart_item_ids_to_delete', []);
        $updatedItems = $this->cart->updateCart($user->id, $cartItemsData, $cartItemIdsToDelete);

        return response()->json([
            'message' => 'Giỏ hàng đã được cập nhật!',
            'updated_items' => $updatedItems,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
