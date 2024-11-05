import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createBrand, deleteBrand,  fecthBrand,  updateBrand } from '../services/brandService';

const BrandContext = createContext();

export const useBrands = () => useContext(BrandContext);

export const BrandProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const loadBrands = async () => {
            try {
                const resdata = await fecthBrand();
                setBrands(resdata.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Chỉ gọi loadBrands nếu đang ở route /admin
        if (location.pathname.startsWith('/admin')) {
            loadBrands();
        }
    }, [location.pathname]);

    const removeBrand = async (id) => {
        if (window.confirm('Bạn có chắc chắn không?')) {
            await deleteBrand(id);
            setBrands((prev) => prev.filter((brand) => brand.id !== id));
        }
    };

    const addBrand = async (brand) => {
        await createBrand(brand);
        // Chỉ tải lại dữ liệu nếu ở admin
        if (location.pathname.startsWith('/admin')) {
            const resdata = await fecthBrand();
            setBrands(resdata.data);
        }
    };

    const editBrand = async (id, brand) => {
        await updateBrand(id, brand);
        // Chỉ tải lại dữ liệu nếu ở admin
        if (location.pathname.startsWith('/admin')) {
            const updatedBrands = await fecthBrand();
            setBrands(updatedBrands.data);
        }
    };

    return (
        <BrandContext.Provider value={{ brands, removeBrand, addBrand, editBrand }}>
            {children}
        </BrandContext.Provider>
    );
};
