import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MainSingle = () => {
  const [details, setDetail] = useState([]);
  const [gallary, setGallary] = useState([]);
  const [variant, setVariant] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null); // State for the selected variant

  const baseURL = "http://127.0.0.1:8000";
  const { slug } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resdata = await axios.get(
          `http://127.0.0.1:8000/api/getProductBySlug/${slug}`
        );
        setDetail(resdata.data.data.product);
        setGallary(resdata.data.data.product.gallary);
        setVariant(resdata.data.data.product.variants);
        setSelectedVariant(resdata.data.data.product.variants[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetail();
  }, [slug]);
  console.log(selectedVariant);
//   console.log(details);
  
  const handleSizeClick = (variant) => {
    setSelectedVariant(variant); // Update the selected variant
  };

  return (
    <div className="product-area single-pro-area pt-80 pb-80 product-style-2">
      <div className="container">
        <div className="row shop-list single-pro-info no-sidebar">
          <div className="col-12">
            <div className="single-product clearfix">
              <div className="single-pro-slider single-big-photo view-lightbox slider-for">
                <div>
                  <img src={`${baseURL}${details.image}`} alt="product" />
                  <a
                    className="view-full-screen"
                    href="img/single-product/large/1.webp"
                    data-lightbox="roadtrip"
                    data-title="My caption"
                  >
                    <i className="zmdi zmdi-zoom-in" />
                  </a>
                </div>
              </div>
              <div className="product-info">
                <div className="fix">
                  <h4 className="post-title floatleft">{details.name}</h4>
                  <span className="pro-rating floatright">
                    <a href="#"><i className="zmdi zmdi-star" /></a>
                    <a href="#"><i className="zmdi zmdi-star" /></a>
                    <a href="#"><i className="zmdi zmdi-star" /></a>
                    <a href="#"><i className="zmdi zmdi-star-half" /></a>
                    <a href="#"><i className="zmdi zmdi-star-half" /></a>
                    <span>(27 Rating)</span>
                  </span>
                </div>
                <div className="fix mb-20">
                  <span className="pro-price">${selectedVariant ? selectedVariant.price : details.price}</span>
                </div>
                <div className="product-description">
                  <p>{details.description}</p>
                </div>

                {/* Size selection */}
                <div className="size-filter single-pro-size mb-35 clearfix">
                  <ul>
                    <li><span className="color-title text-capitalize">size</span></li>
                    {variant.map((v) => (
                      <li key={v.size}>
                        <a href="#" onClick={() => handleSizeClick(v)}>{v.size}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="clearfix">
                  <div className="cart-plus-minus">
                    <input
                      type="text"
                      name="qtybutton"
                      defaultValue={0}
                      className="cart-plus-minus-box"
                    />
                  </div>
                  <div className="product-action clearfix">
                    <a href="#" title="Wishlist"><i className="zmdi zmdi-favorite-outline" /></a>
                    <a href="#" title="Quick View"><i className="zmdi zmdi-zoom-in" /></a>
                    <a href="#" title="Compare"><i className="zmdi zmdi-refresh" /></a>
                    <a href="#" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus" /></a>
                  </div>
                </div>

                {/* Gallery */}
                <div className="single-pro-slider single-sml-photo slider-nav">
                  {gallary.map((img, index) => (
                    <div key={index}>
                      <img src={`${baseURL}${img}`} alt="gallery" />
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

export default MainSingle;
