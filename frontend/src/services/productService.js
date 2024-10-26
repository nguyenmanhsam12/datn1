import api from "../config/axios";

export const createProduct= async (product) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
        const { data } = await api.post('/admin/products/storeProduct', product, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Đảm bảo rằng loại nội dung được chỉ định
            },
        });
        return data;
    }
}