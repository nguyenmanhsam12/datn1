import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './loginForm';
import AuthBanner from './AuthBanner';
import Register from './registerForm';

const Auth = () => {
  return (
    <>
    <AuthBanner/>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path='register' element={<Register/>}/>
    </Routes>
    </>
  );
};

export default Auth;
