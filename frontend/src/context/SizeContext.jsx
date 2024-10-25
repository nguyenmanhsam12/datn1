import React, { createContext, useContext, useEffect, useState } from 'react'
import { createSize, deleteSize, fecthSize, updateSize } from '../services/sizeService';

const SizeContext = createContext();

export const useSizes = () => useContext(SizeContext);
export const SizeProvider = ({children}) => {
    const [sizes, setSizes] = useState([]);

    useEffect(()=>{
        const loadSizes = async () =>{
            try {
                const resdata = await fecthSize();
                // console.log(resdata);
                setSizes(resdata.data)
            } catch (error) {
                console.log(error);
            }
        }
        loadSizes();
    },[])

    const removeSize = async (id) =>{
        if (confirm('Mày có chắc không?')) {
            await deleteSize(id);
            setSizes((prev) => prev.filter((size)=> size.id !== id))
        }
    }

    const addSize = async (size) => {
        const newSize = await createSize(size);
        setSizes((prev)=>[...prev,newSize.data])
    }

    const editSize = async (id, size) => {
        await updateSize(id, size);
        const updateSizes = await fecthSize(); 
        setBrands(updateSizes.data);
    };
  return (
    <SizeContext.Provider value={{sizes,removeSize,addSize, editSize}}>
        {children}
    </SizeContext.Provider>
  )
}
