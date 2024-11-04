import axios from "axios";
import React, { useEffect, useState } from "react";

const MenuProducts = ({ size, onChangeSize }) => {
  const sizes = [38,39,40,41,42]


  return (
    <div className="product-area pt-20 pb-20 product-style-2">
      <div className="container">
        {/* Shop-Content End */}
        <div className="shop-content">
          <div className="row">
            <div className="col-12">
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
                    <button className="option-btn">Brand</button>
                    <div className="dropdown-menu dropdown-width">
                      {/* Widget-Categories start */}
                      <aside className="widget widget-categories">
                        <div className="widget-title">
                          <h4>Brand</h4>
                        </div>
                        <div
                          id="cat-treeview"
                          className="widget-info product-cat boxscrol2"
                        >
                          <ul>
                            <li>
                              <span onClick={() => navigate('/content/nike')}>Nike</span>
                              <span onClick={() => navigate('/content/nike')}>Adidas</span>
                            </li>
                           </ul>
                        </div>
                      </aside>
                      {/* Widget-categories end */}
                    </div>
                  </div>
                  {/* Price end */}
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
                            {sizes.map(item => {
                              return (
                              <li 
                              key={item}
                              className={`${size === item ? 'active' : ''}`}  
                              onClick={() => onChangeSize(item === size ? null : item)}>
                                <a href="#">{item}</a>
                              </li>
                              )
                            })}
                          </ul>
                        </div>
                      </aside>
                      {/* Widget-Size end */}
                    </div>
                  </div>
                </div>
                <div className="right">
                  {/* Size end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuProducts;

