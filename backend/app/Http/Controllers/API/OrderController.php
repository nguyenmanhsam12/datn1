<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\CartCollection;
use App\Mail\PayTheBillMail;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderAddresses;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   

    public function __construct()
    {
       
    }

    public function index(Request $request)
    {
        dd($request);
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
    public function store(StoreOrderRequest $request)
    {
        $user = auth()->user();
        $cartItemIds = $request->cart_item_ids;
        $carts = Cart::with('cartItems')->where('user_id', $user->id)->first();
        if (empty($carts)) {
            return response()->json(['message' => 'Giỏ hàng trống!'], 400);
        }
        $order = Order::createOrder($user, $request);
        $totalAmount = $this->processCartItems($carts, $order, $cartItemIds);
        $order->updateTotalAmount($totalAmount);
        if ($request->payment_method == "momo") {
            return $this->paymentMomo($order);
        } else if ($request->payment_method == "vnpay") {
            return $this->paymentVnPay($order);
        }
//        return response()->json(['message' => 'Đơn hàng đã được tạo thành công!', 'order_id' => $order->id], 200);
    }

    private function processCartItems($carts, $order, $cartItemIds)
    {
        $totalAmount = 0;

        foreach ($carts->cartItems as $cartItem) {
            if (in_array($cartItem->id, $cartItemIds)) {
                $productVariant = $cartItem->productVariant;
                $itemTotal = $cartItem->quantity * $productVariant->price;

                $order->addItem($cartItem->product_variant_id, $cartItem->quantity, $itemTotal);
                $totalAmount += $itemTotal;
            }
        }

        return $totalAmount;
    }

    public function paymentMomo($order)
    {
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = "Thanh toán qua ATM MoMo";
        $amount = $order->total_amount;
        $orderId = "OK" . $order->id;

        $redirectUrl = route('orders.check_payment', $order->id);
        $ipnUrl = route('orders.check_payment', $order->id);
        $extraData = "";

        $requestId = time() . "";
        $requestType = "payWithATM";

        // Tạo chữ ký
        $rawHash = "accessKey=" . $accessKey .
            "&amount=" . $amount .
            "&extraData=" . $extraData .
            "&ipnUrl=" . $ipnUrl .
            "&orderId=" . $orderId .
            "&orderInfo=" . $orderInfo .
            "&partnerCode=" . $partnerCode .
            "&redirectUrl=" . $redirectUrl .
            "&requestId=" . $requestId .
            "&requestType=" . $requestType;

        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        // Tạo dữ liệu gửi đi
        $data = [
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature,
        ];

        $result = $this->execPostRequest($endpoint, json_encode($data));

        // Giải mã JSON
        $jsonResult = json_decode($result, true);
        if (isset($jsonResult['payUrl'])) {
            return response()->json([
                'result' => true,
                'payUrl' => $jsonResult['payUrl']
            ]);
        } else {
            return response()->json(['error' => 'Có lỗi xảy ra khi thực hiện thanh toán.'], 400);
        }
    }

    public function paymentVnPay($order)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = route('orders.check_payment', $order->id);
        $vnp_TmnCode = "74YGUA4Z";//Mã website tại VNPAY
        $vnp_HashSecret = "OUXZGKLBCBEYBWAOAPSISCJZSGUBJOLC"; //Chuỗi bí mật

        $vnp_TxnRef = time() . "";
        $vnp_OrderInfo = "Thanh toán VnPay";
        $vnp_OrderType = "billpayment";
        $vnp_Amount = $order->total_amount * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = 'NCB';
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);//
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        return response()->json([
            'result' => true,
            'links' => $vnp_Url
        ]);
//        $returnData = array('code' => '00'
//        , 'message' => 'success'
//        , 'data' => $vnp_Url);
//        if (isset($_POST['redirect'])) {
//            header('Location: ' . $vnp_Url);
//            die();
//        } else {
//            echo json_encode($returnData);
//        }
    }

    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }


    public function checkPayment(Request $request, $order_id)
    {
        $resultCode = $request->input('resultCode');
        $vnp_ResponseCode = $request->input('vnp_ResponseCode');
        $order = Order::findOrFail($order_id);
        $carts = Cart::with('cartItems')->where('user_id', $order->user_id)->firstOrFail(); // Ensure we have a cart
        $user = User::findOrFail($order->user_id); // Ensure we have a valid user
        $paymentStatus = ($resultCode == 0) || ($vnp_ResponseCode == 0) ? Order::PAID : Order::UNPAID;
        $contentAndData = [
            'subject' => 'Web bán hàng',
            'body' => 'Bạn đã đặt đơn thành công!',
            'listCart' => $carts->cartItems,
            'user' => $user,
            'payment_status' => ($paymentStatus == Order::PAID) ? "Đã thanh toán" : "Chưa thanh toán",
        ];
        $order->payment_status = $paymentStatus;
        $order->save();
        Mail::to($user->email)->send(new PayTheBillMail($contentAndData));
        foreach ($carts->cartItems as $cartItem) {
            $cartItem->delete();
        }
        return response()->json([
            'result' => true,
            'link' => route('orders.index')
        ]);
    }

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



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
