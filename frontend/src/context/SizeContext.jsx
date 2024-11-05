import React, { createContext, useContext, useEffect, useState } from 'react';
import { createSize, deleteSize,  fecthSize,  updateSize } from '../services/sizeService';
import { useLocation, useNavigate } from 'react-router-dom';

const SizeContext = createContext();

export const useSizes = () => useContext(SizeContext);

export const SizeProvider = ({ children }) => {
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadSizes = async () => {
            try {
                const resdata = await fecthSize();
                setSizes(resdata.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Chỉ tải dữ liệu khi ở route /admin
        if (location.pathname.startsWith('/admin')) {
            loadSizes();
        }
    }, [location.pathname]);

    const removeSize = async (id) => {
        if (window.confirm('Mày có chắc không?')) {
            await deleteSize(id);
            setSizes((prev) => prev.filter((size) => size.id !== id));
        }
    };

    const addSize = async (size) => {
        await createSize(size);
        const resdata = await fetchSize();
        setSizes(resdata.data);
        navigate('/admin/sizes');
    };

    const editSize = async (id, size) => {
        await updateSize(id, size);
        const updateSizes = await fetchSize();
        setSizes(updateSizes.data);
        navigate('/admin/sizes');
    };

    return (
        <SizeContext.Provider value={{ sizes, removeSize, addSize, editSize }}>
            {children}
        </SizeContext.Provider>
    );
};
