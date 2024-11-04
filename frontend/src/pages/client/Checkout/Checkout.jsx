import React, { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = () => {
  const { cartItems,resetCart  } = useCart();
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
    district: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        setMessage('Please fill in all required fields correctly.');
        return;
    }

    const orderData = {
        cart_item_ids: cartItems.map(item => item.id),
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
          resetCart();
            setMessage('Order placed successfully!');
            navigate('/'); 
        }
    } catch (error) {
        console.error('Error placing order:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            const errors = error.response.data.errors; 
            if (errors) {
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
            // console.log('API Response:', response); 
            // console.log('Provinces Data:', response.data.data); 
            setProvinces(response.data.data);
        } catch (error) {
            console.error('Error fetching provinces:', error); 
        }
    };

    fetchProvinces();
}, []);
useEffect(() => {
  // console.log('City ID before fetch:', formData.city); 
  if (formData.city) {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/districts/${formData.city}`);
        // console.log('API Response:', response.data); // Kiểm tra phản hồi từ API
        setDistricts(response.data.data); // Lưu trữ dữ liệu quận
        // console.log('Districts:', response.data.data); // Kiểm tra dữ liệu quận
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }
}, [formData.city]);
useEffect(() => {
  // console.log('District ID before fetch:', formData.district); 
  if (formData.district) {
      const fetchWards = async () => {
          try {
              const response = await axios.get(`http://127.0.0.1:8000/api/wards/${formData.district}`);
              // console.log('Fetching wards for district ID:', formData.district); 
              // console.log('Wards API Response:', response.data); 
              setWards(response.data.data); // Set wards data
              // console.log('Wards:', response.data.data); 
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
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Số điện thoại là bắt buộc.';
    if (!formData.email) newErrors.email = 'Email là bắt buộc.';
    if (!formData.address) newErrors.address = 'Địa chỉ cụ thể là bắt buộc.';
    if (!formData.city) newErrors.city = 'Thành phố là bắt buộc.';
    if (!formData.district) newErrors.district = 'Quận/Huyện là bắt buộc.';
    if (!formData.ward) newErrors.ward = 'Xã/Phường là bắt buộc.';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Vui lòng chọn phương thức thanh toán.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  // if (cartItems.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
                <button className="btn btn-outline-primary mt-2 w-100">Áp dụng mã</button>
              </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="h4 mb-3">Tóm Tắt Đơn Hàng</h3>
              <ul className="list-unstyled">
                {cartItems.map((item, index) => (
                  <li key={index} className="d-flex align-items-center justify-content-between mb-3">
                    <img 
                      src={`http://127.0.0.1:8000${item?.product?.image}`} 
                      alt={item?.product?.name} 
                      className="img-fluid rounded" 
                      style={{ width: '100px' }} 
                    />
                    <span className="ms-3">{item?.product?.name} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} VND</span> 
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng cộng:</span>
                <span>{totalAmount.toFixed(2)} VND</span>
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
