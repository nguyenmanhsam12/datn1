import React from 'react';

const CartItem = ({ item}) => { 
    const price = parseFloat(item.price) || 0;
console.log('item', item)
    const baseURL = "http://127.0.0.1:8000"; 

    const cartItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0', 
        borderBottom: '1px solid #eaeaea', 
    };

    const cartItemImageStyle = {
        width: '170px',
        height: '100px',
        objectFit: 'cover',
        marginRight: '20px', 
    };

    const cartItemInfoStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center', 
    };

    const cartItemNameStyle = {
        fontSize: '16px',
        fontWeight: 500,
        color: '#333',
        margin: 0, 
    };

    const cartItemPriceStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#ff5e00',
        marginLeft: '10px', 
    };

    return (
        <tr>
            <td>
                <div style={cartItemStyle}>
                    {item.product ? (
                        <img
                            src={`${baseURL}${item?.product?.image}`}
                            alt={item?.product?.name || "Product"}
                            style={cartItemImageStyle}
                        />
                    ) : (
                        <span>No image available</span>
                    )}
                    <div style={cartItemInfoStyle}>
                        <h4 style={cartItemNameStyle}>{item.product ? item?.product?.name : "Product Name"}</h4>
                        <span style={cartItemPriceStyle}>{price.toFixed(2)} VND</span>
                    </div> 
                </div>
            </td>
        </tr>
    );
};

export default CartItem;