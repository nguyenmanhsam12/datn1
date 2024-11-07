import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios'; 
import CartService from '../services/CartService'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const isAuth = () => {
        const token = sessionStorage.getItem('token');
        return token !== null;
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
                    newQuantity,
                    updatedItems[existingItemIndex]
                );
                const response = await CartService.getCartItems();
                setCartItems(response?.data?.data[0]?.cart_items); 
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
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 400 && response.data.result === false) {
                    toast.error(response.data.message || 'Failed to add item to cart.');
                    return;
                }
        
    

                const newCartItem = response.data.cart_item;
                if (newCartItem && newCartItem.id) {
                    setCartItems(prevItems => [...prevItems, newCartItem]);
                    const response = await CartService.getCartItems();
                    setCartItems(response?.data?.data[0]?.cart_items); 
                } else {
                    console.error("No cart item ID returned from backend:", response.data);
                }
            } catch (error) {
                console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
            }
        }
    };

    const updateCartItemQuantity = async (productVariantId, newQuantity, existingItem) => {
        if (!existingItem) {
            console.error('Existing item is undefined');
            return;
        }

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        if (newQuantity < 1) {
            console.error('Quantity must be at least 1.');
            return;
        }

        const payload = {
            cart_items: [{
                cart_item_id: existingItem.id,
                quantity: newQuantity,
                product_variant_id: productVariantId,
            }],
        };

        try {
            const response = await api.put('/cart/update-cart', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
           

            if (response.data.updated_items && response.data.updated_items.length > 0) {
                const updatedItems = response.data.updated_items;
                setCartItems(prevItems =>
                    prevItems.map(item => {
                        const updatedItem = updatedItems.find(updated => updated.id === item.id);
                        return updatedItem ? { ...item, quantity: updatedItem.quantity } : item;
                    })
                );
            } else {
                console.error('Failed to update cart item quantity: No updated items found in response.');
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error.response ? error.response.data : error.message);
        }
    };

    const removeCartItem = async (id) => {
        try {
            const updatedCartItems = cartItems.filter(item => item.id !== id);
            const cart_item_ids_to_delete = [id];
            await CartService.updateCart(updatedCartItems, cart_item_ids_to_delete);
            setCartItems(updatedCartItems);
            toast.success(`Item with ID: ${id} has been removed from the cart.`);
        } catch (error) {
            console.error('Failed to remove item:', error);
            toast.error('Failed to remove item from the cart.');
        }
    };

    useEffect(() => {
        if (!isAuth()) {
            console.error('User is not authenticated');
            return;
        }

        const fetchCart = async () => {
            console.log('fetch cart');
            try {
                const response = await CartService.getCartItems();
                console.log('Response from getCartItems:', response.data);

                if (response.data?.data?.length > 0) {
                    setCartItems(response.data.data[0].cart_items);
                } else {
                    console.warn('No cart items available.');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
            }
        };

        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateCartItemQuantity,
            removeCartItem,
            setCartItems
        }}>
            {children}
        </CartContext.Provider>
    );
};
