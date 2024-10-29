import React from "react";

const Footer = () => {
  return (
    <footer>
      {/* Footer-area start */}
      <div className="footer-area footer-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12">
              <div className="single-footer">
                <h3 className="footer-title  title-border">Contact Us</h3>
                <ul className="footer-contact">
                  <li>
                    <span>Address :</span>28 Green Tower, Street Name,
                    <br />
                    New York City, USA
                  </li>
                  <li>
                    <span>Cell-Phone :</span>012345 - 123456789
                  </li>
                  <li>
                    <span>Email :</span>your-email@gmail.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-12">
              <div className="single-footer">
                <h3 className="footer-title  title-border">accounts</h3>
                <ul className="footer-menu">
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      My Account
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      My Wishlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      My Cart
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      Check out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 d-none d-lg-block col-12">
              <div className="single-footer">
                <h3 className="footer-title  title-border">shipping</h3>
                <ul className="footer-menu">
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      New Products
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      Top Sellers
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      Manufactirers
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      Suppliers
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="zmdi zmdi-dot-circle" />
                      Specials
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="single-footer">
                <h3 className="footer-title  title-border">
                  Email Newsletters
                </h3>
                <div className="footer-subscribe">
                  <form action="#">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address..."
                    />
                    <button
                      className="button-one submit-btn-4"
                      type="submit"
                      data-text="Subscribe"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer-area end */}
      {/* Copyright-area start */}
      <div className="copyright-area copyright-2">
        <div className="container">
          <div className="row justify-content-md-between justify-content-center">
            <div className="col-md-auto col-12">
              <div className="copyright">
                <p>
                  © 2022 <b className="text-dark">Latest</b> Made with{" "}
                  <i className="fa fa-heart text-danger" /> by{" "}
                  <a href="https://hasthemes.com/">
                    <b>HasThemes</b>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-auto col-12">
              <div className="payment  text-right">
                <a href="#">
                  <img src="client_css/img/payment/1.webp" alt />
                </a>
                <a href="#">
                  <img src="client_css/img/payment/2.webp" alt />
                </a>
                <a href="#">
                  <img src="client_css/img/payment/3.webp" alt />
                </a>
                <a href="#">
                  <img src="client_css/img/payment/4.webp" alt />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright-area start */}
    </footer>
  );
};

export default Footer;
