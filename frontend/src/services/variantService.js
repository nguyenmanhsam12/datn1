import api from "../config/axios";

export const fecthVariant = async()=>{
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const {data} = await api.get('/admin/variants',{
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

export const deleteVariant= async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.delete(`/admin/variants/deleteVariant/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export const updateVariant = async (id, updateVariant) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.put(`/admin/variants/updateVariant/${id}`, updateVariant, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const fecthVariantById = async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.get(`/admin/variants/getDetailVariant/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}