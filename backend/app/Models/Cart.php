<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'cart_id');
    }

    public static function getPaginatedCarts($page, $user_id)
    {
        return self::with('cartItems')
            ->where('user_id', $user_id)
            ->paginate($page);
    }

    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    public static function addOrUpdateCartItem($userId, $productVariantId, $quantity)
    {
        $productVariant = ProductVariant::query()->find($productVariantId)->first();

        if (!$productVariant) {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm variant với ID: ' . $productVariantId,
                'result' => false,
            ], 404);
        }

        if ($productVariant->stock < $quantity) {
            return response()->json([
                'message' => 'Tồn kho không đủ để thêm sản phẩm vào giỏ hàng.',
                'result' => false,
            ], 400);
        }

        $cart = self::firstOrCreate(['user_id' => $userId]);
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_variant_id', $productVariantId->id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;

            if ($productVariant->stock < $newQuantity) {
                return response()->json([
                    'message' => 'Tồn kho không đủ để thêm sản phẩm với số lượng yêu cầu.',
                    'result' => false,
                ], 400);
            }
            $cartItem->quantity = $newQuantity;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_variant_id' => $productVariantId->id,
                'quantity' => $quantity,
                'price' => $productVariantId->price,
            ]);
        }


        return $cartItem;
    }
  public static function deleteCart($userId, $cartItemIdsToDelete)
    {
        try {
            $checkAll = is_array($cartItemIdsToDelete) && in_array("all", $cartItemIdsToDelete);

            if (!empty($cartItemIdsToDelete)) {
                if ($checkAll) {
                    Cart::query()->where('user_id', $userId)->delete();
                    return true;
                }

                CartItem::whereIn('id', $cartItemIdsToDelete)->delete();
            }

            return true;
        } catch (\Exception $e) {
            \Log::error('Lỗi khi xóa các mục trong giỏ hàng: ' . $e->getMessage(), [
                'user_id' => $userId,
                'cart_item_ids_to_delete' => $cartItemIdsToDelete,
            ]);

            return false;
        }
    }

    // public static function updateCart($userId, $cartItemsData, $cartItemIdsToDelete)
    // {
    //     $updatedCartItems = collect();

    //     if (!empty($cartItemIdsToDelete)) {
    //         CartItem::whereIn('id', $cartItemIdsToDelete)->delete();
    //     }

    //     if (!empty($cartItemsData)) {
    //         $cart = Cart::firstOrCreate(['user_id' => $userId]);

    //         foreach ($cartItemsData as $itemData) {

    //             if ($itemData['quantity'] > 0) {
    //                 $cartItem = CartItem::where('id', $itemData['cart_item_id'])->first();

    //                 if ($cartItem) {
    //                     $cartItem->quantity = $itemData['quantity'];
    //                     $cartItem->save();
    //                 } else {
    //                     $cartItem = CartItem::create([
    //                         'cart_id' => $cart->id,
    //                         'product_variant_id' => $itemData['product_variant_id'],
    //                         'quantity' => $itemData['quantity'],
    //                     ]);
    //                 }
    //                 $updatedCartItems->push($cartItem);
    //             } else {
    //                 CartItem::where('id', $itemData['cart_item_id'])->delete();
    //             }
    //         }
    //     }

    //     return $updatedCartItems;
    // }



    
    public static function updateCart($userId, $cartItemsData, $cartItemIdsToDelete)
{
    \Log::info('Received cart items data:', $cartItemsData);

    $updatedCartItems = collect();

    if (!empty($cartItemIdsToDelete)) {
        CartItem::whereIn('id', $cartItemIdsToDelete)->delete();
    }

    if (!empty($cartItemsData)) {
        $cart = Cart::firstOrCreate(['user_id' => $userId]);

        foreach ($cartItemsData as $itemData) {
            // Log each item data to check its structure
            \Log::info('Processing cart item:', $itemData);

            // Check if 'cart_item_id' exists in the item
            if (!isset($itemData['cart_item_id'])) {
                \Log::error('cart_item_id is missing in item data:', $itemData);
                continue; // Skip this item if the ID is missing
            }

            if ($itemData['quantity'] > 0) {
                $cartItem = CartItem::where('id', $itemData['cart_item_id'])->first();

                if ($cartItem) {
                    $cartItem->quantity = $itemData['quantity'];
                    $cartItem->save();
                } else {
                    $cartItem = CartItem::create([
                        'cart_id' => $cart->id,
                        'product_variant_id' => $itemData['product_variant_id'],
                        'quantity' => $itemData['quantity'],
                    ]);
                }
                $updatedCartItems->push($cartItem);
            } else {
                CartItem::where('id', $itemData['cart_item_id'])->delete();
            }
        }
    }

    return $updatedCartItems;
}
 

}

