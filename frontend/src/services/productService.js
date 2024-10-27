import api from "../config/axios";

export const fecthProduct = async() =>{
    const token = sessionStorage.getItem('token')
    if (token) {
        try {
            const {data} = await api.get('/admin/products',{
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

export const createProduct= async (product) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.post('/admin/products/storeProduct', product, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    }
}
export const deleteProduct= async (id) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.delete(`/admin/products/deleteProduct/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}
export const addsingleVariant = async (product_variant) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        await api.post(`/admin/products/storeProductVariant`,product_variant, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}