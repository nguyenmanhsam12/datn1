import api from '../config/axios';

const CartService = {
    getCartItems: async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            return await api.get(`/carts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    },

    updateCart: async (cartItemsData, cartItemIdsToDelete) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
    
        const data = { 
            cart_items: cartItemsData,
            cart_item_ids_to_delete: cartItemIdsToDelete,
        };
    
        try {
            const response = await api.put('/cart/update-cart', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('response',response)
            // if (response.data.status === 'success') { // co can bo cai status kh oo nhi
            //     console.log('Cart updated successfully:', response.data);
            //     return response.data;
            // } else {
            //     console.error('Failed to update cart:', response.data);
            //     throw new Error('Failed to update cart');
            // }
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    },
}    

export default CartService;
