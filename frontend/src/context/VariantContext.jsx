import React, { createContext, useContext, useEffect, useState } from 'react'
import { deleteVariant, fecthVariant, updateVariant } from '../services/variantService';
const VariantContext = createContext();

export const useVariants = () => useContext(VariantContext);
export const VariantProvider = ({children}) => {
    const [variants, setVariant] = useState([]);

    useEffect(()=>{
        const loadVariant = async () =>{
            try {
                const resdata = await fecthVariant();
                // console.log(resdata);
                setVariant(resdata.data)
            } catch (error) {
                console.log(error);
            }
        }
        loadVariant();
    },[])

    const removeVariant = async (id) =>{
        if (confirm('Mày có chắc không?')) {
            await deleteVariant(id);
            setVariant((prev) => prev.filter((variant)=> variant.id !== id))
        }
    }

    const editVariant = async (id, variant) => {
        await updateVariant(id, variant);
        const updVariants = await fecthVariant(); 
        setVariant(updVariants.data);
    };
  return (
    <VariantContext.Provider value={{variants,removeVariant, editVariant}}>
        {children}
    </VariantContext.Provider>
  )
}
