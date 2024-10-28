import React, { useEffect } from 'react';
import Header from '../components/client/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/client/Footer';

const ClientLayout = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
