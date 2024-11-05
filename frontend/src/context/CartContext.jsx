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

    // const fetchCartItems = async () => {  Có component nào dùng cái fetchCartItems này nữa không z, hinh nhu khong dau o a
    //     if (!isAuth()) {
    //         console.error('User is not authenticated');
    //         return; 
    //     } // cai nay ak -- dung roi o a, bon b

    //     try {
    //         const response = await CartService.getCartItems();
    //         console.log('Response from getCartItems:', response.data);
    //         setCartItems(response?.data?.data[0]?.cart_items); 
    //         console.log(response.data.data[0].cart_items);
    //     } catch (error) {
    //         console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
    //     }
    // };

    const addToCart = async (item) => { // dữ liệu trả về bên này đang thiếu 
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
                // console.log('Response from getCartItems:', response.data);
                setCartItems(response?.data?.data[0]?.cart_items); 
            }
        } else {
            // Create payload for new cart item
            const payload = {
                product_variant_id: item.product_variant_id,
                quantity: item.quantity || 1,
            };
            console.log('Payload sent to backend:', payload);
    
            try {
                const response = await api.post('/carts', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Response from backend:', response.data);
    
               
                    const newCartItem = response.data.cart_item;
                    console.log('New cart item:', newCartItem);
                    if (newCartItem && newCartItem.id) {
                        setCartItems(prevItems => [...prevItems, newCartItem]);
                        console.log('Added new item to cart:', newCartItem);
                        const response = await CartService.getCartItems();
                        // console.log('Response from getCartItems:', response.data); 
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
    
        console.log('Payload cập nhật giỏ hàng:', payload);
    
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
    
                console.log(`Successfully updated quantity for item ${existingItem.product_variant_id} to ${newQuantity}`);
            } else {
                console.error('Failed to update cart item quantity: No updated items found in response.');
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

    // useEffect(() => {
    //     if (isAuth()) {
    //         fetchCartItems();
    //     }
    // }, []);
    useEffect(() => {
        if (!isAuth()) {
            console.error('User is not authenticated');
            return; 
        }
        (async () => {
            console.log('fecth cart')
            try {
                const response = await CartService.getCartItems();
                console.log('Response from getCartItems:', response.data);
                setCartItems(response?.data?.data[0]?.cart_items); 
                console.log(response.data.data[0].cart_items);
            } catch (error) {
                console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
            }
        })()
    },[]); 
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
