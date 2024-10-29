import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import QuickView from '../components/client/QuickView';

const ClientLayout = () => {
  useEffect(() => {
    // Danh sách các file CSS và JS cho client
    const cssFiles = [
      '/client_css/css/bootstrap.min.css',
      '/client_css/css/animate.css',
      '/client_css/css/jquery-ui.min.css',
      '/client_css/css/meanmenu.min.css',
      '/client_css/css/owl.carousel.min.css',
      '/client_css/css/slick.css',
      // '/client_css/css/lightbox.min.css',
      '/client_css/css/material-design-iconic-font.css',
      '/client_css/css/default.css',
      '/client_css/style.css',
      '/client_css/css/shortcode.css',
      '/client_css/css/responsive.css',
    ];

    const jsFiles = [
      '/client_css/js/vendor/jquery-1.12.4.min.js',
      '/client_css/js/bootstrap.bundle.min.js',
      '/client_css/js/jquery.meanmenu.js',
      '/client_css/js/slick.min.js',
      '/client_css/js/jquery.treeview.js',
      // '/client_css/js/lightbox.min.js',
      '/client_css/js/jquery-ui.min.js',
      '/client_css/js/owl.carousel.min.js',
      '/client_css/js/jquery.nicescroll.min.js',
      '/client_css/js/countdon.min.js',
      '/client_css/js/wow.min.js',
      '/client_css/js/plugins.js',
      '/client_css/js/main.js',
    ];

    // Thêm các file CSS vào head
    cssFiles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    // Thêm các file JS vào body
    jsFiles.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });

    // Gỡ CSS và JS khi component bị unmount
    return () => {
      cssFiles.forEach(href => {
        const link = document.head.querySelector(`link[href="${href}"]`);
        if (link) link.remove();
      });

      jsFiles.forEach(src => {
        const script = document.body.querySelector(`script[src="${src}"]`);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <Outlet />
      <Footer />
      <QuickView/>
    </div>
  );
};

export default ClientLayout;
