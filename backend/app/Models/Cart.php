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
        $cart = self::firstOrCreate(['user_id' => $userId]);
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_variant_id', $productVariantId->id)
            ->first();


        if ($cartItem) {
            $cartItem->quantity += $quantity;
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

    public static function updateCart($userId, $cartItemsData, $cartItemIdsToDelete)
    {
        $updatedCartItems = collect();

        if (!empty($cartItemIdsToDelete)) {
            CartItem::whereIn('id', $cartItemIdsToDelete)->delete();
        }

        if (!empty($cartItemsData)) {
            $cart = Cart::firstOrCreate(['user_id' => $userId]);

            foreach ($cartItemsData as $itemData) {

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

