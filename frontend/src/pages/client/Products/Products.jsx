import axios from "axios";
import React from 'react';
import BannerProducts from './bannerProducts';
import MainProducts from './mainProducts';
import MenuProducts from './MenuProducts';

const Products = () => {
  const [size, setSize] = React.useState()
  const [products, setProducts] = React.useState([]);
  const [productsCate, setproductsCate] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/allProduct`);//api allproducts
        console.log("ALlProducts", res);
        setProducts(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // const productList = React.useMemo(() => {
  //   if (!size) {
  //     return products
  //   }
  //   return products.filter(item => item.variant?.size === size.toString())
  // }, [size, products])
  
  const fetchProductsByCategory = async (categorySlug) => {
    try {
      const productsCategory = await axios.get(`http://127.0.0.1:8000/api/allProductCategory/${categorySlug}`);// lấy tất cả sản phẩm theo danh mục

      console.log("productsCate",productsCate)
      setProducts(productsCategory.data.data);
    } catch (error) {
      console.log(error); 
    }
  };
  
  return (
    <div className='wrapper bg-dark-white'>
        <BannerProducts/>
        <MenuProducts size={size} onChangeSize={setSize} productsCate={fetchProductsByCategory}/>
        <MainProducts products={products}   />
    </div>
  )
}

export default Products
