import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Purcharse = () => {
  const [cats, setCats] = useState([])
  const [products, setProduct] = useState([])
   const baseURL = 'http://127.0.0.1:8000'
  useEffect(()=>{
    const fetchCat = async ()=>{
      try {
        const resdata = await axios.get('http://127.0.0.1:8000/api/AllCategory')
        console.log(resdata.data.data);
        setCats(resdata.data.data)
      } catch (error) {
          console.log(error);
          
      }
    }
    fetchCat();
  },[])

  const fetchProductsBySlug = async (slug) => {
    try {
      const resdata = await axios.get(`http://127.0.0.1:8000/api/getAllProCate/${slug}`);
      console.log(resdata.data.data);
      
      setProduct(resdata.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="purchase-online-area pt-80">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2 className="title-border">Purchase Online on Latest</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            {/* Nav tabs */}
            <ul className="tab-menu nav">
              {cats.map((cat)=>(
              <li className="nav-item">
                <button
                  className="nav-link"
                  href="#new-arrivals"
                  data-bs-toggle="tab"
                  onClick={() => fetchProductsBySlug(cat.slug)}
                >
                  {cat.name}
                </button>
              </li>
              ))}
            </ul>
          </div>
          <div className="col-12">
            {/* Tab panes */}
            <div className="tab-content">
              <div className="tab-pane active" id="new-arrivals">
                <div className="row">
                  {/* Single-product start */}
                  {products.map((product)=>(
                  <div className="single-product col-xl-3 col-md-4 col-12">
                    <div className="product-img">
                      <span className="pro-label new-label">new</span>
                      <a href="single-product.html">
                        <img src={`${baseURL}${product.image}`} alt />
                      </a>
                      <div className="product-action clearfix">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Wishlist"
                        >
                          <i className="zmdi zmdi-favorite-outline" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#productModal"
                          title="Quick View"
                        >
                          <i className="zmdi zmdi-zoom-in" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Compare"
                        >
                          <i className="zmdi zmdi-refresh" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Add To Cart"
                        >
                          <i className="zmdi zmdi-shopping-cart-plus" />
                        </a>
                      </div>
                    </div>
                    <div className="product-info clearfix">
                      <div className="fix">
                        <h4 className="post-title floatleft">
                          <Link to={`/product/${product.slug}`} href="#">{product.name}</Link>
                        </h4>
                      </div>
                      <div className="fix">
                        <span className="pro-price floatleft">$ 56.20</span>
                        <span className="pro-rating floatright">
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
                    </div>
                  </div>
                 ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purcharse;
