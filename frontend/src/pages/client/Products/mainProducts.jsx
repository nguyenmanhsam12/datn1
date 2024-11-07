import React, { useState } from "react";
import { Link } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

const MainProducts = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="product-area pt-20 pb-20 product-style-2">
      <div className="container">
        <div className="shop-content">
          <div className="col-12">
            <div className="row">
              {currentProducts.map((product) => (
                <div key={product.id} className="col-xl-3 col-md-4 col-12">
                  <div className="single-product">
                    <div className="product-img">
                      <span className="pro-label new-label">
                        ${product.variant.price}
                      </span>
                      <a href={`product/${product.slug}`}>
                        <img
                          src={`${baseURL}${product.image}`}
                          alt={product.name}
                        />
                      </a>
                    </div>
                    <div className="product-info clearfix text-center">
                      <div className="fix">
                        <h4 className="post-title floatleft">
                        <Link to={`product/${product.slug}`}>{product.name}</Link>
                        </h4>
                      </div>
                      <div className="fix">
                        <span className="pro-rating">
                          <a href="#">
                            <i className="zmdi zmdi-star" />
                          </a>
                          <a href="#">
                            <i className="zmdi zmdi-star" />
                          </a>
                          <a href="#">
                            <i className="zmdi zmdi-star" />
                          </a>
                          <a href="#">
                            <i className="zmdi zmdi-star-half" />
                          </a>
                          <a href="#">
                            <i className="zmdi zmdi-star-half" />
                          </a>
                        </span>
                      </div>
                      <div className="product-action clearfix">
                        <a href="#" title="Wishlist">
                          <i className="zmdi zmdi-favorite-outline" />
                        </a>
                        <a href="#" title="Quick View">
                          <i className="zmdi zmdi-zoom-in" />
                        </a>
                        <a href="#" title="Compare">
                          <i className="zmdi zmdi-refresh" />
                        </a>
                        <a href="#" title="Add To Cart">
                          <i className="zmdi zmdi-shopping-cart-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Phân trang */}
            <div className="shop-pagination text-center">
              <div className="pagination">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "disabled" : ""}
                    >
                      <i className="zmdi zmdi-long-arrow-left" />
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      <a href="#" onClick={() => handlePageChange(index + 1)}>
                        {String(index + 1).padStart(2, "0")}
                      </a>
                    </li>
                  ))}
                    <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "disabled" : ""}
                    >
                      <i className="zmdi zmdi-long-arrow-right" />
                    </a>
                  </li>
                </ul>
              
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainProducts;
