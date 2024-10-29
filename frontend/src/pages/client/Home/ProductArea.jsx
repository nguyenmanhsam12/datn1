import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProductArea = () => {
  const[items, setItem] = useState([])
    const baseURL = 'http://127.0.0.1:8000'
    useEffect(()=>{
        const fetchProduct = async() =>{
            try {
                const resdata = await axios.get('http://127.0.0.1:8000/api/getAllProduct')
                console.log(resdata.data.data);
                setItem(resdata.data.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchProduct();
    },[])
    
    console.log(items);
    
  return (
    <div className="product-area pt-80 pb-35">
      <div className="container">
        {/* Section-title start */}
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2 className="title-border">Featured Products</h2>
            </div>
          </div>
        </div>
        {/* Section-title end */}
        <div className="row ">
          <div className="col-12">
            <div className="product-slider arrow-left-right">
              {/* Single-product start */}
              {items.map((item, index) => (
              <div className="single-product" key={index}>
                <div className="product-img">
                  <span className="pro-label new-label">new</span>
                  <a href="single-product.html">
                    <img src={`${baseURL}${item.image}`} alt />
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
                      <Link to={`product/${item.slug}`}>{item.name}</Link>
                    </h4>
                  </div>
                  <div className="fix">
                    <span className="pro-price floatleft">{item.variant.price}</span>
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
              {/* Single-product end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductArea;
