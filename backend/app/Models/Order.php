<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'discount', 'status', 'total_amount', 'payment_method', 'payment_status', 'voucher_id'];
    const PAID = 1;
    const UNPAID = 2;
    const PENDING = 1;

    public static function createOrder($user, $request)
    {
        $voucher = null;
        if (!empty($request->code)) {
            $voucher = Voucher::query()->where('code', $request->code)->first();
        }
//        dd($request->province_id ?? null);
        $order = self::create([
            'user_id' => $user->id,
            'status' => Order::PENDING,
            'payment_status' => Order::UNPAID,
            'total_amount' => 0,
            'payment_method' => $request->payment_method,
            'voucher_id' => $voucher?->id,
        ]);

        OrderAddresses::create([
            'order_id' => $order->id,
            'address_order' => $request->address_order,
//            'city' => $request->city,
            'province_id' => $request->province_id ?? null,
            'ward_id' => $request->ward_id ?? null,
            'district_id' => $request->district_id ?? null,
            'name' => $request->name ?? $user->name,
            'phone_number' => $request->phone ?? $user->phone_number,
            'email' => $request->email ?? $user->email,
            'note' => $request->note ?? "",
        ]);

        return $order;
    }

    public function addItem($productVariantId, $quantity, $price)
    {
        $orderItem = OrderItem::create([
            'order_id' => $this->id,
            'product_variant_id' => $productVariantId,
            'quantity' => $quantity,
            'price' => $price,
        ]);

        $productVariant = ProductVariant::find($productVariantId);

        if ($productVariant) {
            if ($productVariant->stock >= $quantity) {
                $productVariant->stock -= $quantity;
                $productVariant->save();
            } else {
                $orderItem->delete();
                $this->delete();
                OrderAddresses::where('order_id', $this->id)->delete();
                return response()->json([
                    'message' => 'Tồn kho không đủ để thêm sản phẩm vào đơn hàng, đơn hàng đã bị hủy.',
                    'result' => false,
                ], 500);
            }
        } else {
            return response()->json([
                'message' => "Không tìm thấy sản phẩm variant với ID: $productVariantId",
                'result' => false,
            ], 500);
        }

    }

    public function updateTotalAmount($totalAmount, $discountAmount)
    {
        $this->update([
            'total_amount' => $totalAmount - $discountAmount,
            'discount' => $discountAmount,
        ]);
    }
}

