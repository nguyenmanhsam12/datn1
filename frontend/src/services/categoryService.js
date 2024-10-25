import api from "../config/axios";

export const fecthCategory = async() =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const {data} = await api.get('/admin/categories',{
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

export const fecthCategoryById = async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.get(`/admin/categories/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const createCategory= async (Category) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.post('/admin/categories/store', Category, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const updateCategory= async (id, updatedCategory) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.put(`/admin/categories/update/${id}`, updatedCategory, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    }
}

export const deleteCategory= async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.delete(`/admin/categories/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}