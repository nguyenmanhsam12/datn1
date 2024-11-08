import axios from "axios";
import React, { useEffect, useState } from "react";

const MenuProducts = ({ size, onChangeSize, productsCate }) => {
  const sizes = [38, 39, 40, 41, 42];
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

  const CategoryItem = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false); // Quản lý trạng thái hover

    // Toggle trạng thái hover
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <li
        className="dropdown-item-text"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className="category-title"
          onClick={() => productsCate(category.slug)} 
        >
          {category.name}
        </span>

        {isHovered && category.children?.length > 0 && (
          <ul className="list">
            {category.children.map((child) => (
              <CategoryItem key={child.slug} category={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="product-area pt-20 pb-20 product-style-2">
      <div className="container">
        <div className="shop-content">
          <div className="row">
            <div className="col-12">
              <div className="product-option d-flex flex-column-reverse flex-md-row justify-content-between align-items-center mb-30">
                <div className="left d-flex">
                  <a href="/products" className="option-btn">
                    Products
                  </a>

                  {/* Categories start */}
                  <div className="dropdown">
                    <button className="option-btn">Categories</button>
                    <div className="dropdown-menu dropdown-width">
                      <aside className="widget widget-categories">
                        <div className="widget-title">
                          <h4>Categories</h4>
                        </div>
                        <div
                          id="cat-treeview"
                          className="widget-info product-cat boxscrol2"
                        >
                          <ul>
                            {category.map((cate) => (
                              <CategoryItem key={cate.slug} category={cate} />
                            ))}
                          </ul>
                        </div>
                      </aside>
                    </div>
                  </div>
                  {/* Categories end */}

                  {/* Brand filter start */}
                  <div className="dropdown">
                    <button className="option-btn">Brand</button>
                    <div className="dropdown-menu dropdown-width">
                      <aside className="widget widget-categories">
                        <div className="widget-title">
                          <h4>Brand</h4>
                        </div>
                        <div className="widget-info product-cat boxscrol2">
                          <ul>
                          <li>
                              <span onClick={() => setBrand('nike')}>Nike</span>
                              <span onClick={() => setBrand('adidas')}>Adidas</span>
                            </li>
                          </ul>
                        </div>
                      </aside>
                    </div>
                  </div>
                  {/* Brand filter end */}

                  {/* Size filter start */}
                  <div className="dropdown">
                    <button className="option-btn">Size</button>
                    <div className="dropdown-menu dropdown-width">
                      <aside className="widget widget-size">
                        <div className="widget-title">
                          <h4>Size</h4>
                        </div>
                        <div className="widget-info size-filter clearfix">
                          <ul>
                            {sizes.map((item) => (
                              <li
                                key={item}
                                className={`${size === item ? "active" : ""}`}
                                onClick={() =>
                                  onChangeSize(item === size ? null : item)
                                }
                              >
                                <a href="#">{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </aside>
                    </div>
                  </div>
                  {/* Size filter end */}
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
