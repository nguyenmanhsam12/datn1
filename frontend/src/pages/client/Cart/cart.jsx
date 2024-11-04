import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeCartItem, clearCart } = useCart();
  const [message, setMessage] = useState('');
  const [allSelected, setAllSelected] = useState(false); 

  const increaseQuantity = async (productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    if (item) {
      const newQuantity = item.quantity + 1;
      await updateCartItemQuantity(productVariantId, newQuantity); 
    }
  };

  const decreaseQuantity = async (productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      await updateCartItemQuantity(productVariantId, newQuantity); 
    }
  };

  const handleRemoveItem = async (productVariantId) => {
    const item = cartItems.find(cartItem => cartItem.product_variant_id === productVariantId);
    if (item) {
      await removeCartItem(item.id); 
    }
  };

  const handleToggleSelectAll = () => {
    setAllSelected(prev => !prev); 
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + ((item.price || 0) * (item.quantity || 0)),
    0
  );

  return (
    <div className="container my-5">
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

          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}

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
                            checked={allSelected} 
                            onChange={() => {}} 
                          />
                        </td>
                        <td className="text-center">
                          <img
                            src={`http://127.0.0.1:8000${item.product.image}`} 
                            // alt={item.product.name}
                            style={{ width: '150px', height: '100px', objectFit: 'cover' }} 
                          />
                        </td>
                        <td className="text-center">
                          <strong>{item?.product?.name}</strong>
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
                            Remove
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
              <span className="h5 text-danger">{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} VND</span>

            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-danger" onClick={clearCart}>
                Clear All
              </button>
              <Link to="/checkout" className="btn btn-primary">
                Check Out
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
