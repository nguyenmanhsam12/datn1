import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MenuProducts = ({ size, onChangeSize ,productsCate}) => {
  const sizes = [38,39,40,41,42]
   const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/AllCategory`);
        console.log("listCategory", res);
        setCategory(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  
  return (
    <div className="product-area pt-20 pb-20 product-style-2">
      <div className="container">
        {/* Shop-Content End */}
        <div className="shop-content">
          <div className="row">
            <div className="col-12">
              <div className="product-option d-flex flex-column-reverse flex-md-row justify-content-between align-items-center mb-30">
                <div className="left d-flex">
                <a href="" className="option-btn">Products</a>
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
                          <ul className="list-group">
                            {category.map((cate, index) => (
                              <button className={`list-group ${index === 0 ? 'active' : ''}`} key={cate.name}>
                                <li
                                  className={`list-group ${index === 0 ? 'active' : ''}`}
                                  data-bs-toggle="tab"
                                  onClick={() => productsCate(cate.slug)}
                                >
                                  {cate.name}
                                </li>
                              </button>
                            ))}
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
                              <span onClick={() => setBrand('nike')}>Nike</span>
                              <span onClick={() => setBrand('adidas')}>Adidas</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuProducts;

