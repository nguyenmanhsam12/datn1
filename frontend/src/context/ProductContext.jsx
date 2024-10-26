import React, { createContext, useContext, useEffect, useState } from 'react'
import { createProduct } from '../services/productService';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);


    const addProduct = async (product) => {
        const newProduct = await createProduct(product);
        setProducts((prev)=>[...prev,newProduct])
    }

  return (
    <ProductContext.Provider value={{products,addProduct}}>
        {children}
    </ProductContext.Provider>
  )
}
