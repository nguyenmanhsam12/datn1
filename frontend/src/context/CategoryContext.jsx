import React, { createContext, useContext, useEffect, useState } from 'react'
import { createCategory, deleteCategory, fecthCategory, updateCategory } from '../services/categoryService';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);
export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const loadCategories = async () =>{
            try {
                const resdata = await fecthCategory();
                // console.log(resdata);
                setCategories(resdata.data)
            } catch (error) {
                console.log(error);
            }
        }
        loadCategories();
    },[])

    const removeCategory = async (id) =>{
        if (confirm('Mày có chắc không?')) {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((category)=> category.id !== id))

        }
    }

    const addCategory = async (category) => {
        const newCategory = await createCategory(category);
        setCategories((prev)=>[...prev,newCategory.data]);
    }

    const editCategory = async (id, category) => {
        await updateCategory(id, category);
        const updateCategories = await fecthCategory(); 
        setCategories(updateCategories.data);
    };
  return (
    <CategoryContext.Provider value={{categories,removeCategory,addCategory, editCategory}}>
        {children}
    </CategoryContext.Provider>
  )
}
