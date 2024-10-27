import React, { createContext, useContext, useEffect, useState } from 'react'
import { createBrand, deleteBrand, fecthBrand, updateBrand } from '../services/brandService';

const BrandContext = createContext();

export const useBrands = () => useContext(BrandContext);
export const BrandProvider = ({children}) => {
    const [brands, setBrands] = useState([]);

    useEffect(()=>{
        const loadBrands = async () =>{
            try {
                const resdata = await fecthBrand();
                // console.log(resdata);
                setBrands(resdata.data)
            } catch (error) {
                console.log(error);
            }
        }
        loadBrands();
    },[])

    const removeBrand = async (id) =>{
        if (confirm('Mày có chắc không?')) {
            await deleteBrand(id);
            setBrands((prev) => prev.filter((brand)=> brand.id !== id))
        }
    }

    const addBrand = async (brand) => {
        await createBrand(brand);
        const resdata = await fecthBrand(); 
        setBrands(resdata.data);
    }

    const editBrand = async (id, brand) => {
        await updateBrand(id, brand);
        const updatedBrands = await fecthBrand(); 
        setBrands(updatedBrands.data);
    };
  return (
    <BrandContext.Provider value={{brands,removeBrand,addBrand, editBrand}}>
        {children}
    </BrandContext.Provider>
  )
}
