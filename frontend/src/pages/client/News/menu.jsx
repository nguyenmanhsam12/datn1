const MenuNews = () => {

  return (
    <div className="blog-area blog-2  pt-80 pb-80">
      <div className="container">
        <div className="blog">
          <div className="row">
            <div className="col-md-12">
              <div className="product-option d-flex flex-column-reverse flex-md-row justify-content-between align-items-center mb-30">
                <div className="left d-flex">
                  {/* Categories start */}
                  <div className="dropdown">
                    <button className="option-btn">Categories</button>
                    <div className="dropdown-menu dropdown-width">
                      {/* Widget-Categories start */}
                      <aside className="widget widget-categories">
                        <div className="widget-title">
                          <h4>Categories</h4>
                        </div>
                        <div
                          id="cat-treeview"
                          className="widget-info product-cat boxscrol2"
                        >
                          <ul>
                            <li>
                              <span>Chair</span>
                              <ul>
                                <li>
                                  <a href="#">T-Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Striped Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Half Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Formal Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Bilazers</a>
                                </li>
                              </ul>
                            </li>
                            <li className="open">
                              <span>Bag</span>
                              <ul>
                                <li>
                                  <a href="#">Men Bag</a>
                                </li>
                                <li>
                                  <a href="#">Shoes</a>
                                </li>
                                <li>
                                  <a href="#">Watch</a>
                                </li>
                                <li>
                                  <a href="#">T-shirt</a>
                                </li>
                                <li>
                                  <a href="#">Shirt</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Accessories</span>
                              <ul>
                                <li>
                                  <a href="#">T-Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Striped Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Half Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Formal Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Bilazers</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Top Brands</span>
                              <ul>
                                <li>
                                  <a href="#">T-Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Striped Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Half Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Formal Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Bilazers</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Jewelry</span>
                              <ul>
                                <li>
                                  <a href="#">T-Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Striped Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Half Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Formal Shirts</a>
                                </li>
                                <li>
                                  <a href="#">Bilazers</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </aside>
                      {/* Widget-categories end */}
                    </div>
                  </div>
                  {/* Categories end */}
                  {/* Price start */}
                  <div className="dropdown">
                    <button className="option-btn">Price</button>
                    <div className="dropdown-menu dropdown-width">
                      {/* Shop-Filter start */}
                      <aside className="widget shop-filter">
                        <div className="widget-title">
                          <h4>Price</h4>
                        </div>
                        <div className="widget-info">
                          <div className="price_filter">
                            <div className="price_slider_amount">
                              <input type="submit" defaultValue="You range :" />
                              <input
                                type="text"
                                id="amount"
                                name="price"
                                placeholder="Add Your Price"
                              />
                            </div>
                            <div id="slider-range" />
                          </div>
                        </div>
                      </aside>
                      {/* Shop-Filter end */}
                    </div>
                  </div>
                  {/* Price end */}
                  {/* Color start */}
                  <div className="dropdown">
                    <button className="option-btn">Color</button>
                    <div className="dropdown-menu dropdown-width">
                      {/* Widget-Color start */}
                      <aside className="widget widget-color">
                        <div className="widget-title">
                          <h4>Color</h4>
                        </div>
                        <div className="widget-info color-filter clearfix">
                          <ul>
                            <li>
                              <a href="#">
                                <span className="color color-1" />
                                LightSalmon<span className="count">12</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="color color-2" />
                                Dark Salmon<span className="count">20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="color color-3" />
                                Tomato<span className="count">59</span>
                              </a>
                            </li>
                            <li className="active">
                              <a href="#">
                                <span className="color color-4" />
                                Deep Sky Blue<span className="count">45</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="color color-5" />
                                Electric Purple<span className="count">78</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="color color-6" />
                                Atlantis<span className="count">10</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="color color-7" />
                                Deep Lilac<span className="count">15</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </aside>
                      {/* Widget-Color end */}
                    </div>
                  </div>
                  {/* Color end */}
                  {/* Size start */}
                  <div className="dropdown">
                    <button className="option-btn">Size</button>
                    <div className="dropdown-menu dropdown-width">
                      {/* Widget-Size start */}
                      <aside className="widget widget-size">
                        <div className="widget-title">
                          <h4>Size</h4>
                        </div>
                        <div className="widget-info size-filter clearfix">
                          <ul>
                            <li>
                              <a href="#">M</a>
                            </li>
                            <li className="active">
                              <a href="#">S</a>
                            </li>
                            <li>
                              <a href="#">L</a>
                            </li>
                            <li>
                              <a href="#">SL</a>
                            </li>
                            <li>
                              <a href="#">XL</a>
                            </li>
                          </ul>
                        </div>
                      </aside>
                      {/* Widget-Size end */}
                    </div>
                  </div>
                </div>
                <div className="right">
                  {/* Size end */}
                  <div className="showing text-end">
                    <p className="mb-0 hidden-xs">
                      Showing 01-09 of 17 Results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuNews;
