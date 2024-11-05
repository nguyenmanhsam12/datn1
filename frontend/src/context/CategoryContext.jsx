import React, { createContext, useContext, useEffect, useState } from 'react';
import { createCategory, deleteCategory,  fecthCategory,  updateCategory } from '../services/categoryService';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const resdata = await fecthCategory();
                setCategories(resdata.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Chỉ gọi loadCategories nếu đang ở route /admin
        if (location.pathname.startsWith('/admin')) {
            loadCategories();
        }
    }, [location.pathname]);

    const removeCategory = async (id) => {
        if (window.confirm('Mày có chắc không?')) {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((category) => category.id !== id));
        }
    };

    const addCategory = async (category) => {
        await createCategory(category);
        const updateCategories = await fetchCategory();
        setCategories(updateCategories.data);
        navigate('/admin/categories');
    };

    const editCategory = async (id, category) => {
        await updateCategory(id, category);
        const updateCategories = await fetchCategory();
        setCategories(updateCategories.data);
    };

    return (
        <CategoryContext.Provider value={{ categories, removeCategory, addCategory, editCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
