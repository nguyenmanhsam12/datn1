import api from "../config/axios";

export const fecthColors = async() =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const {data} = await api.get('/admin/colors',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data;
        } catch (error) {
            console.log(error);
        } 
    } 
}

export const fecthColorById = async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.get(`/admin/colors/getDetailColor/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const createColor= async (color) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.post('/admin/colors/storeColor', color, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const updateColor= async (id, updateColor) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.put(`/admin/colors/updateColor/${id}`, updateColor, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const deleteColor = async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.delete(`/admin/colors/deleteColor/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}