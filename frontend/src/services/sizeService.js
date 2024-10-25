import api from "../config/axios";

export const fecthSize = async() =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const {data} = await api.get('/admin/sizes',{
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

export const fecthSizeById = async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.get(`/admin/sizes/getDetailSize/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const createSize= async (brand) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.post('/admin/sizes/storeSize', brand, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const updateSize= async (id, updateSize) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.put(`/admin/sizes/updateSize/${id}`, updateSize, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const deleteSize= async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.delete(`/admin/sizes/deleteSize/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}