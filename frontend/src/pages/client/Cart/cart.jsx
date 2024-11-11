import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CartService from '../../../services/CartService';
const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeCartItem, clearCart, setCartItems } = useCart();
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const navigate = useNavigate();

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems(new Set()); 
    } else {
      const allItemIds = cartItems.map(item => item.product_variant_id);
      setSelectedItems(new Set(allItemIds)); 
    }
    setAllSelected(prev => !prev);
  };

  const handleToggleSelectItem = (productVariantId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(productVariantId)) {
      newSelectedItems.delete(productVariantId); 
    } else {
      newSelectedItems.add(productVariantId); 
    }
    setSelectedItems(newSelectedItems);
  };

  const totalPrice = Array.from(selectedItems).reduce((total, productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    const itemTotal = (item?.price || 0) * (item?.quantity || 0);
    return total + itemTotal;
  }, 0);

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      toast.warn("Please select at least one item to checkout.");
    } else {
      const itemsToCheckout = Array.from(selectedItems).map(productVariantId =>
        cartItems.find(item => item.product_variant_id === productVariantId)
      ).filter(Boolean);

      navigate('/checkout', { state: { items: itemsToCheckout } });
    }
  };

  const handleRemoveItem = async (productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    if (item) {
      const isConfirmed = window.confirm("Are you sure you want to remove this item?");
      if (isConfirmed) {
        await removeCartItem(item.id);
        toast.success("Item removed successfully!");
      }
    }
  };

  const increaseQuantity = async (productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    if (item) {
        const newQuantity = item.quantity + 1;
        await updateCartItemQuantity(productVariantId, newQuantity, item); // Truyền item vào
    } else {
        console.error(`Item with productVariantId ${productVariantId} not found`);
    }
};
  const decreaseQuantity = async (productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    if (item && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        await updateCartItemQuantity(productVariantId, newQuantity, item); 
    } else if (!item) {
        console.error(`Item with productVariantId ${productVariantId} not found`);
    }
  };

  // xóa full cart
  const handleClearAll = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete the selected items?");
    if (isConfirmed) {
        const cartItemIdsToDelete = Array.from(selectedItems).map(productVariantId =>
            cartItems.find(item => item.product_variant_id === productVariantId)?.id
        ).filter(id => id !== undefined); 
        
        if (cartItemIdsToDelete.length === 0) {
            toast.error("No items selected for deletion.");
            return;
        }

        try {
            await CartService.deleteCartItems(cartItemIdsToDelete); 
            
            const updatedCartItems = cartItems.filter(item => !selectedItems.has(item.product_variant_id));
            setCartItems(updatedCartItems); 
            setSelectedItems(new Set());
            toast.success("Selected items have been removed from the cart.");
        } catch (error) {
            console.error("Failed to delete selected items:", error);
            toast.error("Failed to delete selected items.");
        }
    }
};


  return (
    <div className="container my-5">
      <ToastContainer />
      <main className="main-container no-sidebar">
        <div className="container bg-white rounded shadow-lg p-4">
          <div className="breadcrumb-trail mb-4">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-primary">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shopping Cart
              </li>
            </ul>
          </div>

          <h3 className="text-center mb-4">Shopping Cart</h3>

          <div className="shoppingcart-content bg-light rounded shadow p-4">
            <form className="cart-form" onSubmit={(e) => e.preventDefault()}>
              <table className="table table-striped">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col" className="text-center">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleToggleSelectAll}
                      />
                    </th>
                    <th scope="col" className="text-center">Image</th>
                    <th scope="col" className="text-center">Product</th>
                    <th scope="col" className="text-center">Price</th>
                    <th scope="col" className="text-center">Quantity</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <tr key={item.product_variant_id}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.product_variant_id)}
                            onChange={() => handleToggleSelectItem(item.product_variant_id)}
                          />
                        </td>
                        <td className="text-center">
                          <img
                            src={`http://127.0.0.1:8000${item.product.image}`}
                            style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                          />
                        </td>
                        <td className="text-center">
                          <strong>{item?.product?.name}</strong>
                          <div className="text-muted">Size: {item?.size?.size}</div>
                        </td>
                        <td className="text-center">
                          {(item.price || 0).toLocaleString()} VND
                        </td>
                        <td className="text-center">
                          <button type="button" onClick={() => decreaseQuantity(item.product_variant_id)}>-</button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            readOnly
                            className="form-control text-center"
                            style={{ width: '70px', display: 'inline-block' }}
                          />
                           <button type="button" onClick={() => increaseQuantity(item.product_variant_id)}>+</button>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-link text-danger"
                            onClick={() => handleRemoveItem(item.product_variant_id)}
                          >
                            <i class="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </form>

            <div className="d-flex justify-content-between align-items-center border-top pt-3">
              <span className="font-weight-bold">Total Price:</span>
              <span className="h5 text-danger">
                {selectedItems.size > 0 && totalPrice > 0
                  ? totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : '0'
                } VND
              </span>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-danger" onClick={handleClearAll}>
              <i class="bi bi-trash3"></i>
              </button>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Check Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
