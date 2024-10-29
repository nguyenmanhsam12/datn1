import React from 'react'

const AuthBanner = () => {
  return (
    <div className="heading-banner-area overlay-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-banner">
              <div className="heading-banner-title">
                <h2>Đăng Nhập</h2>
              </div>
              <div className="breadcumbs pb-15">
                <ul>
                  <li>
                    <a href="index.html">Trang Chủ</a>
                  </li>
                  <li>Đăng Nhập</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBanner