import React, { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const CheckoutForm = () => {
  const {cartItems, setCartItems  } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    paymentMethod: '', 
    voucher: '',
  });
  const location = useLocation();
  const { items = [] } = location.state || {};
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!items.length) {
    console.error("Checkout items are undefined!");
    return <div>No items in cart</div>;
  }
  const handleApplyDiscount = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/discount-amount', {
        params: {
          code: discountCode, // discount code entered by the user
          'cart_item_ids[]': items.map(item => item.id), // cart item IDs
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
  
      if (response.data.result) {
        let discountAmount = response.data.discount_amount;
        console.log('Discount Applied:', discountAmount);
        setDiscountAmount(discountAmount); // Store the discount amount in state
        setMessage(`Discount applied: ${discountAmount.toFixed(2)} VND`);
      } else {
        setMessage(response.data.error);
      }
  
    } catch (error) {
      if (error.response) {
        // console.error('Error applying discount:', error.response.data);
        setMessage(`Failed to apply discount: ${error.response.data.message || error.response.data.error}`);
      } else {
        console.error('Error applying discount:', error);
        setMessage('Failed to apply discount. Please try again.');
      }
    }
  };
  
  
  
  // const totalPrice = Array.isArray(items) ? items.reduce((total, item) => {
  //   return total + (parseFloat(item.price) * item.quantity);
  // }, 0) : 0;
    
  const resetCart = (purchasedItems) => {
    const remainingItems = cartItems.filter(item =>
        !purchasedItems.some(purchased => purchased.product_variant_id === item.product_variant_id)
    );
    setCartItems(remainingItems);
    sessionStorage.setItem('cart', JSON.stringify(remainingItems)); // Cập nhật session storage
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage('Please fill in all required fields correctly.');
      return;
    }

    const orderData = {
      cart_item_ids: items.map(item => item.id),
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      code: discountCode || '',
      payment_method: formData.paymentMethod || 'COD',
      address_order: formData.address || '',
      province_id: parseInt(formData.city, 10) || 0,
      district_id: parseInt(formData.district, 10) || 0,
      ward_id: parseInt(formData.ward, 10) || 0,
      note: formData.note || '',
      
    };

    console.log('Order Data:', orderData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/orders/store', orderData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.data.result) {
        // const selectedItem = [];
        resetCart(items);
        setMessage('Order placed successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        const errors = error.response.data.errors; 
        if (errors) {
          console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
          const errorMessages = Object.values(errors).flat().join(', ');
          setMessage(`Errors: ${errorMessages}`);
        } else {
          setMessage('An error occurred while placing your order.');
        }
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/provinces');
        setProvinces(response.data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (formData.city) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/districts/${formData.city}`);
          setDistricts(response.data.data);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
      fetchDistricts();
    }
  }, [formData.city]);

  useEffect(() => {
    if (formData.district) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/wards/${formData.district}`);
          setWards(response.data.data);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      };
      fetchWards();
    }
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ và tên là bắt buộc.';
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Số điện thoại không hợp lệ.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ.';
    if (!formData.address) newErrors.address = 'Địa chỉ cụ thể là bắt buộc.';
    if (!formData.city) newErrors.city = 'Thành phố là bắt buộc.';
    if (!formData.district) newErrors.district = 'Quận/Huyện là bắt buộc.';
    if (!formData.ward) newErrors.ward = 'Xã/Phường là bắt buộc.';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Vui lòng chọn phương thức thanh toán.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-5 display-4">Thông Tin Đặt Hàng</h2>
        {message && <p>{message}</p>}
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="h4 mb-3">Thông Tin Giao Hàng</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Họ và tên"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Số điện thoại"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                    {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ cụ thể</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Địa chỉ cụ thể"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </div>
                <div className="row mb-3">
                <div className="col-md-4">
                    <label className="form-label">Tỉnh/Thành phố</label>
                    <select
                        name="city" 
                        className="form-control"
                        value={formData.city} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}> 
                                {province.name}
                            </option>
                        ))}
                    </select>
                    {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Quận/Huyện</label>
                  <select
                    name="district"
                    className="form-control"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district?.id} value={district?.id}>
                        {district?.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && <small className="text-danger">{errors.district}</small>}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Xã/Phường</label>
                  <select
                        name="ward"
                        className="form-control"
                        value={formData.ward} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Chọn xã/phường</option> 
                        {wards.map((ward) => (
                            <option key={ward.id} value={ward.id}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                      {errors.ward && <small className="text-danger">{errors.ward}</small>}
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label">Ghi chú (nếu có)</label>
                  <textarea
                    name="note"
                    className="form-control"
                    placeholder="Ghi chú"
                    value={formData.note}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="h4 mb-3">Phương Thức Thanh Toán</h3>
              <div className="form-check mb-2">
                <input 
                  type="radio" 
                  id="payment1" 
                  name="paymentMethod" 
                  value="MOMO" 
                  className="form-check-input" 
                  onChange={handleChange} 
                  required 
                />
                <label className="form-check-label" htmlFor="payment1">Thanh toán qua MoMo</label>
              </div>
              <div className="form-check mb-2">
                <input 
                  type="radio" 
                  id="payment2" 
                  name="paymentMethod" 
                  value="VNPAY" 
                  className="form-check-input" 
                  onChange={handleChange} 
                />
                <label className="form-check-label" htmlFor="payment2">Thanh toán qua VNPay</label>
              </div>
              <div className="form-check mb-2">
                <input 
                  type="radio" 
                  id="payment3" 
                  name="paymentMethod" 
                  value="COD" 
                  className="form-check-input" 
                  onChange={handleChange} 
                />
                <label className="form-check-label" htmlFor="payment3"
                value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>COD</label>
              </div>
              {errors.paymentMethod && <small className="text-danger">{errors.paymentMethod}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Mã Giảm Giá</label>
                <input
                  type="text"
                  name="voucher"
                  className="form-control"
                  placeholder="Nhập mã giảm giá"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                className="btn btn-outline-primary mt-2 w-100"
                onClick={handleApplyDiscount} // Add onClick handler
            >
                Áp dụng mã
            </button>
            {message && <small className="text-success d-block mt-2">{message}</small>}
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
  <h3 className="h4 mb-3">Tóm Tắt Đơn Hàng</h3>
  {items && items.length > 0 ? (
    <ul className="list-unstyled">
      {items.map((selectedItem, index) => (
        <li key={index} className="d-flex align-items-center justify-content-between mb-3">
          <img 
            src={`http://127.0.0.1:8000${selectedItem.product.image}`} 
            alt={selectedItem.product.name} 
            className="img-fluid rounded" 
            style={{ width: '100px' }} 
          />
          <span className="ms-3">{selectedItem.product.name} x {selectedItem.quantity}</span>
          <span>{(selectedItem.price * selectedItem.quantity).toFixed(2)} VND</span> 
        </li>
      ))}
    </ul>
  ) : (
    <p>No item selected for checkout.</p>
  )}
  {/* <div className="d-flex justify-content-between fw-bold">
    <span>Tổng cộng:</span>
    <span>
      {items ? items.reduce((total, selectedItem) => total + (selectedItem.price * selectedItem.quantity), 0).toFixed(2) : 0} VND
    </span>
  </div> */}

  {/* Apply discount and show discounted total */}
  {discountAmount > 0 && (
    <div className="d-flex justify-content-between fw-bold mt-2">
      <span>Giảm giá:</span>
      <span>- {discountAmount.toFixed(2)} VND</span>
    </div>
  )}

  <div className="d-flex justify-content-between fw-bold mt-2">
    <span><strong>Tổng cộng:</strong></span>
    <span>
      {items ? 
        (items.reduce((total, selectedItem) => total + (selectedItem.price * selectedItem.quantity), 0) - discountAmount).toFixed(2) 
        : 0} VND
    </span>
  </div>
</div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleSubmit} 
              >
                Xác Nhận Đặt Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
