import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });

            // Lưu token vào Local Storage
            sessionStorage.setItem('token', response.data.token);

            alert('Đăng nhập thành công');
            // Thực hiện chuyển hướng hoặc cập nhật giao diện nếu cần
            navigate('/')

        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            alert('Đăng nhập không thành công: ' + (error.response?.data?.message || 'Có lỗi xảy ra'));
        }
    };
  return (
    <form onSubmit={handleLogin} className="border container mt-3 mb-3">
      <div className="customer-login text-left">
        <h4 className="title-1 title-border text-uppercase mb-30">Đăng nhập</h4>
        <p className="text-gray">
          Bạn không có tài khoản?<Link to={'/auth/register'}>Đăng kí ngay</Link>
        </p>
        <input type="text" placeholder="Email here..." name="email"  value={email}  onChange={(e) => setEmail(e.target.value)} />
        <input type="password"  value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <p>
          <a href="#" className="text-gray">
            Quên mật khẩu?
          </a>
        </p>
        <button
          type="submit"
          data-text="login"
          className="button-one submit-button mt-15"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default Login;
