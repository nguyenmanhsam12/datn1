import React, { createContext, useContext, useEffect, useState } from 'react'
import { createColor, deleteColor, fecthColors, updateColor } from '../services/colorService';

const ColorContext = createContext();

export const useColors = () => useContext(ColorContext);
export const ColorProvider = ({children}) => {
    const [colors, setColors] = useState([]);

    useEffect(()=>{
        const loadColors = async () =>{
            try {
                const resdata = await fecthColors();
                // console.log(resdata);
                setColors(resdata.data)
            } catch (error) {
                console.log(error);
            }
        }
        loadColors();
    },[])

    const removeColor = async (id) =>{
        if (confirm('Mày có chắc không?')) {
            await deleteColor(id);
            setColors((prev) => prev.filter((color)=> color.id !== id))
        }
    }

    const addColor = async (color) => {
        const newColor = await createColor(color);
        setColors((prev)=>[...prev,newColor.data])
    }

    const editColor= async (id, color) => {
        await updateColor(id, color);
        const updateColors = await fecthColors(); 
        setColors(updateColors.data);
    };
  return (
    <ColorContext.Provider value={{colors,removeColor,addColor, editColor}}>
        {children}
    </ColorContext.Provider>
  )
}
