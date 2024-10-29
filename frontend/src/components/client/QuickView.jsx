import React from "react";

const QuickView = () => {
  return (
    <div id="quickview-wrapper">
      {/* Modal */}
      <div className="modal fade" id="productModal" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="modal-product">
                <div className="product-images">
                  <div className="main-image images">
                    <img alt="#" src="img/product/quickview-photo.webp" />
                  </div>
                </div>
                {/* .product-images */}
                <div className="product-info">
                  <h1>Aenean eu tristique</h1>
                  <div className="price-box-3">
                    <hr />
                    <div className="s-price-box">
                      <span className="new-price">$160.00</span>
                      <span className="old-price">$190.00</span>
                    </div>
                    <hr />
                  </div>
                  <a href="shop.html" className="see-all">
                    See all features
                  </a>
                  <div className="quick-add-to-cart">
                    <form method="post" className="cart">
                      <div className="numbers-row">
                        <input
                          type="number"
                          min={1}
                          id="french-hens"
                          defaultValue={3}
                        />
                      </div>
                      <button
                        className="single_add_to_cart_button"
                        type="submit"
                      >
                        Add to cart
                      </button>
                    </form>
                  </div>
                  <div className="quick-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    fringilla augue nec est tristique auctor. Donec non est at
                    libero.
                  </div>
                  <div className="social-sharing">
                    <div className="widget widget_socialsharing_widget">
                      <h3 className="widget-title-modal">Share this product</h3>
                      <ul className="social-icons">
                        <li>
                          <a
                            target="_blank"
                            title="Google +"
                            href="#"
                            className="gplus social-icon"
                          >
                            <i className="zmdi zmdi-google-plus" />
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            title="Twitter"
                            href="#"
                            className="twitter social-icon"
                          >
                            <i className="zmdi zmdi-twitter" />
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            title="Facebook"
                            href="#"
                            className="facebook social-icon"
                          >
                            <i className="zmdi zmdi-facebook" />
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            title="LinkedIn"
                            href="#"
                            className="linkedin social-icon"
                          >
                            <i className="zmdi zmdi-linkedin" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* .product-info */}
              </div>
              {/* .modal-product */}
            </div>
            {/* .modal-body */}
          </div>
          {/* .modal-content */}
        </div>
        {/* .modal-dialog */}
      </div>
      {/* END Modal */}
    </div>
  );
};

export default QuickView;
