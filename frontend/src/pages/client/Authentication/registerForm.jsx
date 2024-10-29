import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        phone_number: phoneNumber,
      });
      alert(response.data.message);
      navigate("/auth/login");
    } catch (error) {
      alert(error.response.data.message || "An error occurred");
    }
  };
  return (
    <form onSubmit={handleRegister} className="border container mt-3 mb-3">
      <h4 className="title-1 title-border text-uppercase mb-30">Đăng Kí</h4>
      <p className="text-gray">
        Đã có tài khoản? <Link to={"/auth/login"}>Đăng nhập</Link>
      </p>
      <input type="text" placeholder="Your name here..." name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email address here..." name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <input type="text" placeholder="sdt" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
      {/* <p className="mb-0">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          defaultChecked
        />
        <label htmlFor="newsletter">
          <span>Sign up for our newsletter!</span>
        </label>
      </p> */}
      <button
        type="submit"
        data-text="regiter"
        className="button-one submit-button mt-15"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default Register;
