import axios from "axios";
import React from 'react';
import BannerProducts from './bannerProducts';
import MainProducts from './mainProducts';
import MenuProducts from './MenuProducts';

const Products = () => {
  const [size, setSize] = React.useState()
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fecthProducts = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/allProduct`);
        console.log("Data", res);
        setProducts(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fecthProducts();
  }, []);

  const productList = React.useMemo(() => {
    if (!size) {
      return products
    }
    return products.filter(item => item.variant?.size === size.toString())
  }, [size, products])

  return (
    <div className='wrapper bg-dark-white'>
        <BannerProducts/>
        <MenuProducts size={size} onChangeSize={setSize} />
        <MainProducts products={productList} />
    </div>
  )
}

export default Products
