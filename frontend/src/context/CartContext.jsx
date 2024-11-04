import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios'; 
import CartService from '../services/CartService'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const isAuth = () => {
        const token = sessionStorage.getItem('token');
        return token !== null;
    };

    const fetchCartItems = async () => {
        if (!isAuth()) {
            console.error('User is not authenticated');
            return; 
        }

        try {
            const response = await CartService.getCartItems();
            console.log('Response from getCartItems:', response.data);
            setCartItems(response?.data?.data[0]?.cart_items); 
            console.log(response.data.data[0].cart_items);
        } catch (error) {
            console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
        }
    };

    const addToCart = async (item) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }
    
        const existingItemIndex = cartItems.findIndex(
            cartItem => cartItem.product_variant_id === item.product_variant_id
        );
    
        if (existingItemIndex !== -1) {
            const updatedItems = [...cartItems];
            const newQuantity = updatedItems[existingItemIndex].quantity + item.quantity; 
            updatedItems[existingItemIndex].quantity = newQuantity; 
            setCartItems(updatedItems); 
    
            if (newQuantity > 0) {
                await updateCartItemQuantity(
                    updatedItems[existingItemIndex].product_variant_id,
                    newQuantity
                ); 
            }
        } else {
            const payload = {
                product_variant_id: item.product_variant_id,
                quantity: item.quantity || 1, 
            };
    
            try {
                const response = await api.post('/carts', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.data.status === 'success') {
                    const newCartItem = response.data.data.cart_item;
                    setCartItems(prevItems => [...prevItems, newCartItem]); 
                }
            } catch (error) {
                console.error(
                    'Error adding item to cart:',
                    error.response ? error.response.data : error.message
                );
            }
        }
    };
    
    const updateCartItemQuantity = async (productVariantId, newQuantity) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }
    
        if (newQuantity < 1) {
            console.error('Quantity must be at least 1.');
            return;
        }
    
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product_variant_id === productVariantId ? { ...item, quantity: newQuantity } : item
            )
        );
    
        try {
            const response = await api.put('/cart/update-cart', {
                cart_items: [{
                     cart_item_id: productVariantId,
                     quantity: newQuantity,
                      }],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            if (response.data.status === 'success') {
                console.log(`Successfully updated quantity for item ${productVariantId} to ${newQuantity}`);
            } else {
                console.error('Failed to update cart item quantity:', response.data);
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error.response ? error.response.data : error.message);
        }
    };
    
    

    const removeCartItem = async (id) => {
        try {
            // Lấy danh sách sản phẩm trong giỏ hàng
            const updatedCartItems = cartItems.filter(item => item.id !== id); // Lọc bỏ sản phẩm cần xóa

            // Tạo danh sách ID cần xóa
            const cart_item_ids_to_delete = [id];

            // Gọi hàm updateCart để cập nhật giỏ hàng
            await CartService.updateCart(updatedCartItems, cart_item_ids_to_delete);

            // Cập nhật lại state giỏ hàng
            setCartItems(updatedCartItems);
            console.log(`Item with ID: ${id} has been removed from the cart.`);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    useEffect(() => {
        if (isAuth()) {
            fetchCartItems();
        }
    }, []);
    const resetCart = () => {
        setCartItems([]); // Reset giỏ hàng
        sessionStorage.removeItem('cart'); 
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeCartItem,resetCart }}>
            {children}
        </CartContext.Provider>
    );
};
