import React, { createContext, useContext, useEffect, useState } from 'react';
import { deleteVariant,  fecthVariant,  updateVariant } from '../services/variantService';
import { useLocation } from 'react-router-dom';

const VariantContext = createContext();

export const useVariants = () => useContext(VariantContext);

export const VariantProvider = ({ children }) => {
    const [variants, setVariants] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const loadVariants = async () => {
            try {
                const resdata = await fecthVariant();
                setVariants(resdata.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Chỉ tải dữ liệu khi ở route /admin
        if (location.pathname.startsWith('/admin')) {
            loadVariants();
        }
    }, [location.pathname]);

    const removeVariant = async (id) => {
        if (window.confirm('Mày có chắc không?')) {
            await deleteVariant(id);
            setVariants((prev) => prev.filter((variant) => variant.id !== id));
        }
    };

    const editVariant = async (id, variant) => {
        await updateVariant(id, variant);
        const updatedVariants = await fetchVariant();
        setVariants(updatedVariants.data);
    };

    return (
        <VariantContext.Provider value={{ variants, removeVariant, editVariant }}>
            {children}
        </VariantContext.Provider>
    );
};
