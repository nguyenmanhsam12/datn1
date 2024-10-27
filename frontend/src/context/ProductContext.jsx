import React, { createContext, useContext, useEffect, useState } from 'react'
import { addsingleVariant, createProduct, deleteProduct, fecthProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    // const navigate = useNavigate();

    useEffect(()=>{
      const loadProducts = async () =>{
        try {
          const resdata = await fecthProduct();
          // console.log(resdata);
          setProducts(resdata.data)
        } catch (error) {
            console.log(error);
        }
      }
      loadProducts();
    },[])

    const removeProduct = async (id) =>{
      if (confirm('Mày có chắc không?')) {
          await deleteProduct(id);
          setProducts((prev) => prev.filter((product)=> product.id !== id))

      }
  }

  const addProduct = async (product) => {
        await createProduct(product);
        const resdata = await fecthProduct();
        setProducts(resdata.data)
      navigate('/admin/products')
  }

  const addVariant = async(product_variant) => {
    await addsingleVariant(product_variant)
    const resdata = await fecthProduct();
    setProducts(resdata.data)
  }
  return (
    <ProductContext.Provider value={{products,addProduct, removeProduct, addVariant}}>
        {children}
    </ProductContext.Provider>
  )
}
