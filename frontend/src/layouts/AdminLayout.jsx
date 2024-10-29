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

    // Các file JS không phụ thuộc thứ tự
    const independentJsFiles = [
      "/plugins/jquery/jquery.min.js",
      "/plugins/jquery-ui/jquery-ui.min.js",
      "/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "/plugins/chart.js/Chart.min.js",
      "/plugins/sparklines/sparkline.js",
      "/plugins/jqvmap/jquery.vmap.min.js",
      "/plugins/jquery-knob/jquery.knob.min.js",
      "/plugins/moment/moment.min.js",
    ];

    // Các file JS phụ thuộc lẫn nhau (tải theo thứ tự)
    const dependentJsFiles = [
      "/plugins/daterangepicker/daterangepicker.js",
      "/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js",
      "/plugins/summernote/summernote-bs4.min.js",
      "/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
      "/dist/js/adminlte.js",
      "/dist/js/demo.js",
      "/dist/js/pages/dashboard.js"
    ];

    // Nạp CSS đồng thời
    const loadCSS = () => {
      return Promise.all(
        cssFiles.map(href => {
          return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
          });
        })
      );
    };

    // Nạp JS không phụ thuộc đồng thời
    const loadIndependentJS = () => {
      return Promise.all(
        independentJsFiles.map(src => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        })
      );
    };

    // Nạp JS phụ thuộc lẫn nhau theo thứ tự
    const loadDependentJS = async () => {
      for (const src of dependentJsFiles) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
      if (window.$) {
        window.$.widget.bridge('uibutton', window.$.ui.button);
      }
    };

    // Nạp CSS, sau đó JS không phụ thuộc, rồi đến JS phụ thuộc
    loadCSS()
      .then(loadIndependentJS)
      .then(loadDependentJS)
      .catch(error => console.error('Lỗi khi tải CSS/JS:', error));

    // Cleanup các thẻ khi component bị unmount
    return () => {
      cssFiles.forEach(href => {
        const link = document.head.querySelector(`link[href="${href}"]`);
        if (link) link.remove();
      });

      [...independentJsFiles, ...dependentJsFiles].forEach(src => {
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
