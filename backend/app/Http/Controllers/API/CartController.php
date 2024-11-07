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
        try {
            // Get the authenticated user
            $user = auth()->user();
            
            // Get the cart items data from the request
            $cartItemsData = $request->input('cart_items');
            
            // Get the IDs of items to delete from the request
            $cartItemIdsToDelete = $request->input('cart_item_ids_to_delete', []);
            
            // Call the cart service to update the cart
            $updatedItems = $this->cart->updateCart($user->id, $cartItemsData, $cartItemIdsToDelete);
        
            // Return a successful response
            return response()->json([
                'message' => 'Giỏ hàng đã được cập nhật!',
                'updated_items' => $updatedItems,
            ], 200);
    
        } catch (\Exception $e) {
            // If an exception occurs, return an error response with the message
            return response()->json([
                'message' => 'Có lỗi xảy ra khi cập nhật giỏ hàng!',
                'result' => false,
                'error' => $e->getMessage(),  // Optionally, log this message for debugging
            ], 500); // 500 is a generic server error code
        }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = auth()->user();
        $cartItemIdsToDelete = $request->input('cart_item_ids_to_delete', []);
        $deleteItems = $this->cart->deleteCart($user->id, $cartItemIdsToDelete);
        return response()->json([
            'message' => 'Giỏ hàng đã được cập nhật!',
            'result' => $deleteItems,
        ], 200);
    }
}
