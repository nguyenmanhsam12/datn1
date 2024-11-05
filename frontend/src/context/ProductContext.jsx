import React, { createContext, useContext, useEffect, useState } from 'react';
import { addsingleVariant, createProduct, deleteProduct, fecthProduct, updateProduct } from '../services/productService';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const resdata = await fecthProduct();
                setProducts(resdata.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Chỉ gọi loadProducts nếu đang ở route /admin
        if (location.pathname.startsWith('/admin')) {
            loadProducts();
        }
    }, [location.pathname]);

    const removeProduct = async (id) => {
        if (window.confirm('Mày có chắc không?')) {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        }
    };

    const addProduct = async (product) => {
        await createProduct(product);
        const resdata = await fetchProduct();
        setProducts(resdata.data);
        navigate('/admin/products');
    };

    const addVariant = async (product_variant) => {
        await addsingleVariant(product_variant);
        const resdata = await fetchProduct();
        setProducts(resdata.data);
    };

    const editProduct = async (id, product) => {
        await updateProduct(id, product);
        const updateProducts = await fetchProduct();
        setProducts(updateProducts.data);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct, addVariant, editProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
