import api from "../config/axios";

export const fecthBrand = async() =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const {data} = await api.get('/admin/brands',{
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

export const fecthBrandById = async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.get(`/admin/brands/getDetailBrand/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const createBrand= async (brand) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.post('/admin/brands/store', brand, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const updateBrand= async (id, updatedBrand) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.put(`/admin/brands/updateBrand/${id}`, updatedBrand, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const deleteBrand= async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.delete(`/admin/brands/deleteBrand/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}