<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hóa đơn thanh toán</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
        }

        .invoice-container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }

        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .invoice-header h1 {
            color: #333;
        }

        .invoice-details {
            margin-bottom: 20px;
        }

        .invoice-details p {
            margin: 5px 0;
        }

        .invoice-items {
            border-collapse: collapse;
            width: 100%;
        }

        .invoice-items th,
        .invoice-items td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .invoice-items th {
            background-color: #f2f2f2;
        }

        .total-row {
            font-weight: bold;
        }
    </style>
</head>

<body>
<div class="invoice-container">
    <div class="invoice-header">
        <h1>Hóa đơn thanh toán tại WWeb</h1>
    </div>
    <div class="invoice-details">
        <p><strong>Khách hàng:</strong> {{$user['name']}}</p>
        <p><strong>Email:</strong> {{$user['email']}}</p>
    </div>
    <table class="invoice-items">
        <thead>
        <tr>
            <th>Mã hóa đơn</th>
            <th>Tên sp</th>
            <th>Giá sp</th>
            <th>Size</th>
            <th>Color</th>
            <th>Số lượng</th>
            <th>Trang thai thanh toan</th>
            <th>Tổng tiền</th>
        </tr>
        </thead>
        <tbody>
        @php
            $totalPrice = 0;
        @endphp
        @foreach($listCart as $cart)
            @php
                $productPrice = $cart?->productVariant?->product?->price ?? 0; // Get product price, or 0 if not set
                $quantity = $cart?->quantity ?? 0; // Get quantity, or 0 if not set
                $itemTotal = $productPrice * $quantity; // Calculate total for the current item
                $totalPrice += $itemTotal; // Add to the overall total
            @endphp
            <tr>
                <td>#{{ $cart->id }}</td>
                <td>{{ $cart?->productVariant?->product?->name }}</td>
                <td>{{ number_format($cart?->productVariant?->product?->price) }}</td>
                <td>{{ $cart?->productVariant?->size?->size }}</td>
                <td>{{ $cart?->productVariant?->color?->color }}</td>
                <td>{{ $cart?->quantity }}</td>
                <td>{{ $payment_status }}</td>
                <td>{{ number_format($itemTotal) }}</td>
            </tr>
        @endforeach


        </tbody>
        <tfoot>

        <tr class="total-row">
            <td colspan="7">Tổng cộng</td>
            <td>{{ number_format($totalPrice) }}</td>
        </tr>
        </tfoot>
    </table>
</div>
</body>

</html>
