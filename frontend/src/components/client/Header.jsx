import React from "react";

const Header = () => {
  return (
    <header>
      {/* Header Top start */}
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="welcome-mes">
                <p>Xin Chào Mừng!</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="header-right-menu text-center text-md-end">
                <ul>
                  <li>
                    <a href="#">Tài Khoản</a>
                    <i className="zmdi zmdi-chevron-down" />
                    <ul>
                      <li>
                        <a href="#">Tài Khoản Của Tôi</a>
                      </li>
                      <li>
                        <a href="#">Yêu Thích</a>
                      </li>
                      <li>
                        <a href="#">Giỏ Hàng</a>
                      </li>
                      <li>
                        <a href="#">Thanh Toán</a>
                      </li>
                      <li>
                        <a href="#">Đơn Hàng</a>
                      </li>
                      <li>
                        <a href="#">Đăng Nhập</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">vnd</a>
                    <i className="zmdi zmdi-chevron-down" />
                    <ul>
                      <li>
                        <a href="#">eur</a>
                      </li>
                      <li>
                        <a href="#">usd</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Vietnamese</a>
                    <i className="zmdi zmdi-chevron-down" />
                    <ul>
                      <li>
                        <a href="#">English</a>
                      </li>
                      <li>
                        <a href="#">France</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header Top End */}
      {/* Header Bottom Menu Area Start */}
      <div id="sticky-menu" className="header-bottom">
        <div className="container">
          <div className="row justify-content-between">
            {/* logo start */}
            <div className="col-md col-6">
              <div className="top-logo">
                <a href="">
                  <img src="/client_css/img/logo/logo.webp" alt />
                </a>
              </div>
            </div>
            {/* logo end */}
            {/* mainmenu area start */}
            <div className="col-md-auto col-6 d-flex justify-content-end">
              {/* Menu Area */}
              <div className="mainmenu  position-relative">
                <nav>
                  <ul>
                    <li className="expand">
                      <a href="">Trang Chủ</a>
                    </li>
                    <li className="expand">
                      <a href="">Giới Thiệu</a>
                    </li>
                    <li className="expand position-static">
                      <a href="">Cửa Hàng</a>
                      <div className="restrain mega-menu megamenu2">
                        <span>
                          <a className="mega-menu-title" href="">
                            Rings
                          </a>
                          <a href="">Coats &amp; Jackets</a>
                          <a href="">Blazers</a>
                          <a href="">Jackets</a>
                          <a href="">Rincoats</a>
                        </span>
                        <span>
                          <a
                            className="mega-menu-title"
                            href=""
                          >
                            Dresses
                          </a>
                          <a href="">Ankle Boots</a>
                          <a href="">Footwear</a>
                          <a href="">Clog Sandals</a>
                          <a href="">Combat Boots</a>
                        </span>
                        <span>
                          <a
                            className="mega-menu-title"
                            href=""
                          >
                            Accessories
                          </a>
                          <a href="">Bootees bags</a>
                          <a href="">Blazers</a>
                          <a href="">Jackets</a>
                          <a href="">Shoes</a>
                        </span>
                        <span className="block-last">
                          <a
                            className="mega-menu-title"
                            href=""
                          >
                            Top
                          </a>
                          <a href="">Briefs</a>
                          <a href="">Camis</a>
                          <a href="">Nigntwears</a>
                          <a href="">Shapewears</a>
                        </span>
                      </div>
                    </li>
                    <li className="expand">
                      <a href="">Tin Tức</a>
                    </li>
                    <li className="expand">
                      <a href="">Liên Hệ</a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Menu Area */}
              {/* Menu Cart Area Start */}
              <div className="mini-cart text-right">
                <ul>
                  <li>
                    <a className="cart-icon" href="#">
                      <i className="zmdi zmdi-shopping-cart" />
                      <span>3</span>
                    </a>
                    <div className="mini-cart-brief text-left">
                      <div className="cart-items">
                        <p className="mb-0">
                          You have <span>03 items</span> in your shopping bag
                        </p>
                      </div>
                      <div className="all-cart-product clearfix">
                        <div className="single-cart clearfix">
                          <div className="cart-photo">
                            <a href="#">
                              <img src="client_css/img/cart/1.webp" alt />
                            </a>
                          </div>
                          <div className="cart-info">
                            <h5>
                              <a href="#">dummy product name</a>
                            </h5>
                            <p className="mb-0">Price : $ 100.00</p>
                            <p className="mb-0">Qty : 02 </p>
                            <span className="cart-delete">
                              <a href="#">
                                <i className="zmdi zmdi-close" />
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="single-cart clearfix">
                          <div className="cart-photo">
                            <a href="#">
                              <img src="client_css/img/cart/2.webp" alt />
                            </a>
                          </div>
                          <div className="cart-info">
                            <h5>
                              <a href="#">dummy product name</a>
                            </h5>
                            <p className="mb-0">Price : $ 300.00</p>
                            <p className="mb-0">Qty : 01 </p>
                            <span className="cart-delete">
                              <a href="#">
                                <i className="zmdi zmdi-close" />
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="cart-totals">
                        <h5 className="mb-0">
                          Total <span className="floatright">$500.00</span>
                        </h5>
                      </div>
                      <div className="cart-bottom  clearfix">
                        <a
                          href="#"
                          className="button-one floatleft text-uppercase"
                          data-text="View cart"
                        >
                          View cart
                        </a>
                        <a
                          href="#"
                          className="button-one floatright text-uppercase"
                          data-text="Check out"
                        >
                          Check out
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Menu Cart Area Start */}
            </div>
            {/* mainmenu area end */}
          </div>
        </div>
      </div>
      {/* Header Menu Bottom Area Start */}
      {/* Mobile-menu start */}
      <div className="mobile-menu-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-block d-md-none">
              <div className="mobile-menu">
                <nav id="dropdown">
                  <ul>
                    <li>
                      <a href="index.html">home</a>
                      <ul>
                        <li>
                          <a href="index.html">Home V1</a>
                        </li>
                        <li>
                          <a href="index-2.html">Home V2</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="shop.html">products</a>
                    </li>
                    <li>
                      <a href="shop-sidebar.html">accesories</a>
                    </li>
                    <li>
                      <a href="shop-list.html">lookbook</a>
                    </li>
                    <li>
                      <a href="blog.html">blog</a>
                      <ul>
                        <li>
                          <a href="blog.html">Blog</a>
                        </li>
                        <li>
                          <a href="single-blog.html">Single Blog</a>
                        </li>
                        <li>
                          <a href="single-blog-sidebar.html">
                            Single Blog Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">pages</a>
                      <ul>
                        <li>
                          <a href="shop.html">Shop</a>
                        </li>
                        <li>
                          <a href="shop-sidebar.html">Shop Sidebar</a>
                        </li>
                        <li>
                          <a href="shop-list.html">Shop List</a>
                        </li>
                        <li>
                          <a href="single-product.html">Single Product</a>
                        </li>
                        <li>
                          <a href="single-product-sidebar.html">
                            Single Product Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="cart.html">Shopping Cart</a>
                        </li>
                        <li>
                          <a href="wishlist.html">Wishlist</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="order.html">Order</a>
                        </li>
                        <li>
                          <a href="login.html">login / Registration</a>
                        </li>
                        <li>
                          <a href="my-account.html">My Account</a>
                        </li>
                        <li>
                          <a href="404.html">404</a>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                        </li>
                        <li>
                          <a href="single-blog.html">Single Blog</a>
                        </li>
                        <li>
                          <a href="single-blog-sidebar.html">
                            Single Blog Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="about.html">About Us</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="about.html">about us</a>
                    </li>
                    <li>
                      <a href="contact.html">contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile-menu end */}
    </header>
  );
};

export default Header;
