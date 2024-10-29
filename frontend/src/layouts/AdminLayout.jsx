import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/admin/Navbar/navbar';
import SideBar from '../components/admin/SideBar/SideBar';
import FooterAdmin from '../components/admin/FooterAdmin/FooterAdmin';

const AdminLayout = () => {
  useEffect(() => {
    // Các file CSS cần thiết
    const cssFiles = [
      "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback",
      "/plugins/fontawesome-free/css/all.min.css",
      "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
      "/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
      "/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
      "/plugins/jqvmap/jqvmap.min.css",
      "/dist/css/adminlte.min.css",
      "/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
      "/plugins/daterangepicker/daterangepicker.css",
      "/plugins/summernote/summernote-bs4.min.css"
    ];

    // Các file JS cần thiết
    const jsFiles = [
      "/plugins/jquery/jquery.min.js",
      "/plugins/jquery-ui/jquery-ui.min.js",
      "/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "/plugins/chart.js/Chart.min.js",
      "/plugins/sparklines/sparkline.js",
      "/plugins/jqvmap/jquery.vmap.min.js",
      "/plugins/jqvmap/maps/jquery.vmap.usa.js",
      "/plugins/jquery-knob/jquery.knob.min.js",
      "/plugins/moment/moment.min.js",
      "/plugins/daterangepicker/daterangepicker.js",
      "/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js",
      "/plugins/summernote/summernote-bs4.min.js",
      "/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
      "/dist/js/adminlte.js",
      "/dist/js/demo.js",
      "/dist/js/pages/dashboard.js"
    ];

    // Thêm CSS vào <head>
    cssFiles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    // Thêm JS vào <body> và đảm bảo nạp đúng thứ tự
    const loadScripts = async () => {
      for (const src of jsFiles) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      // Khởi tạo jQuery UI bridge sau khi các script đã nạp
      if (window.$) {
        window.$.widget.bridge('uibutton', window.$.ui.button);
      }
    };

    loadScripts().catch(error => console.error('Lỗi khi tải script:', error));

    // Cleanup các thẻ khi component bị unmount
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
    <div className="wrapper">
      <NavBar />
      <SideBar />
      <Outlet />
      <aside className="control-sidebar control-sidebar-dark"></aside>
      <FooterAdmin />
    </div>
  );
};

export default AdminLayout;
