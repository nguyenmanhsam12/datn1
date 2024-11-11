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
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    },
    deleteCartItems: async (cartItemIds) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
    
        const data = { cart_item_ids_to_delete: cartItemIds };
    
        try {
            const response = await api.post('/cart/delete-cart', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Deleted cart items response:', response.data); // Log the response
            return response.data;
        } catch (error) {
            console.error('Error deleting cart items:', error);
            throw error;
        }
    }
    
}    

export default CartService;
