import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainSingle = () => {
    const [details, setDetail] = useState({});
    const [gallary, setGallary] = useState([]);
    const [variant, setVariant] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const { addToCart } = useCart();
    const baseURL = "http://127.0.0.1:8000"; 
    const { slug } = useParams();
    const [isAdding, setIsAdding] = useState(false);
    
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const resdata = await axios.get(`http://127.0.0.1:8000/api/getProductBySlug/${slug}`);
                const product = resdata.data.data.product;
                setDetail(product);
                setGallary(product.gallary);
                setVariant(product.variants);
                setSelectedVariant(null);
                setQuantity(1);
            } catch (error) {
                console.log("Error fetching product details:", error);
            }
        };
        fetchDetail();
    }, [slug]);

    const handleSizeClick = (variant) => {
        console.log("Variant clicked:", variant);
        setSelectedVariant(variant);
        setQuantity(1); 
    };

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = async () => {
        if (isAdding) return; 
        setIsAdding(true); 
    
        const token = sessionStorage.getItem("token"); 
        if (!token) {
            toast.warning("Please log in to add products to the cart.");
            setIsAdding(false);
            return;
        }
    
        if (!selectedVariant) {
            toast.warning("Please select a variant before adding to cart.");
            setIsAdding(false); 
            return;
        }
        if (!selectedVariant || selectedVariant.stock === 0) {
            toast.error("Sorry, this product is out of stock.");
            setIsAdding(false);
            return;
        }
        if (selectedVariant.stock < quantity) {
            toast.error("Sorry, not enough stock to add this product to the cart.");
            setIsAdding(false);
            return;
        }
        if (quantity <= 0) {
            toast.warning("Quantity must be greater than 0.");
            setIsAdding(false); 
            return;
        }
    
        try {
            await addToCart({
                product_variant_id: selectedVariant.id,
                quantity: quantity,
            });
            toast.success("Product added to cart successfully!");
            setQuantity(1); 
        } catch (error) {
            console.error('Caught error:', error); 
            if (error.response) {
                console.error('Server responded with:', error.response.data); 
            } else {
                console.error('Error message:', error.message); 
            }
            toast.error("Failed to add product to cart.");
        } finally {
            setIsAdding(false); 
        }
    };

    return (
        <div className="product-area single-pro-area pt-80 pb-80 product-style-2">
            <div className="container">
                <ToastContainer />

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
                                        <span>(27 Rating)</span>
                                    </span>
                                </div>
                                <div className="fix mb-20">
                                    <span className="pro-price">
                                    ${selectedVariant ? selectedVariant.price :  `${details.minPrice} - ${details.maxPrice}`}
                                    </span>
                                </div>
                                <div className="product-description">
                                    <p>{details.description}</p>
                                </div>

                                {/* Size selection */}
                                <div className="size-filter single-pro-size mb-35 clearfix">
                                    <ul>
                                        <li><span className="color-title text-capitalize">Size</span></li>
                                        {variant.map((v) => (
                                            <li key={v.size}>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault(); 
                                                    handleSizeClick(v);
                                                }}>
                                                    {v.size}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="stock-info mb-20">
                                    {selectedVariant ? (
                                        selectedVariant.stock > 0 ? (
                                            <span className="in-stock">In Stock: {selectedVariant.stock}</span>
                                        ) : (
                                            <span className="out-of-stock">Out of Stock</span>
                                        )
                                    ) : (
                                        <span className="select-variant">Please select a size</span>
                                    )}
                                </div>
                                <div className="clearfix">
                                    <div className="cart-plus-minus">
                                        <button onClick={decrementQuantity} className="dec qtybutton">-</button>
                                        <input
                                            // type="number"
                                            name="qtybutton"
                                            value={quantity}
                                            min="1"
                                            onChange={(e) => {
                                                const value = Math.max(1, parseInt(e.target.value) || 1); 
                                                setQuantity(value);
                                            }}
                                            className="cart-plus-minus-box"
                                        />
                                        <button onClick={incrementQuantity} className="inc qtybutton">+</button>
                                    </div>
                                    <div className="product-action clearfix">
                                        <a href="#" title="Wishlist"><i className="zmdi zmdi-favorite-outline" /></a>
                                        <a href="#" title="Quick View"><i className="zmdi zmdi-zoom-in" /></a>
                                        <a href="#" title="Compare"><i className="zmdi zmdi-refresh" /></a>
                                        <a href="#" title="Add To Cart" onClick={(e) => {
                                                e.preventDefault(); 
                                                handleAddToCart();
                                            }}>
                                            <i className="zmdi zmdi-shopping-cart-plus" />
                                        </a>
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
