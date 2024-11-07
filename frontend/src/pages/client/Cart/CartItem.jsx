import React from 'react';

const CartItem = ({ item }) => { 
    const price = parseFloat(item.price) || 0;
    const baseURL = "http://127.0.0.1:8000"; 

    const cartItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0', 
        borderBottom: '1px solid #eaeaea', 
    };

    const cartItemImageStyle = {
        width: '150px',
        height: '100px',
        objectFit: 'cover',
        marginRight: '20px', 
    };

    const cartItemInfoStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
    };

    const cartItemNamePriceStyle = {
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        alignItems: 'center', // Align name and price vertically in the center
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

    const cartItemSizeStyle = {
        fontSize: '14px',
        color: '#555',
        marginTop: '5px',
    };

    const size = item?.size?.size;

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
                        <div style={cartItemNamePriceStyle}>
                            <h4 style={cartItemNameStyle}>{item.product ? item?.product?.name : "Product Name"}</h4>
                            <span style={cartItemPriceStyle}>{price.toFixed(2)} VND</span>
                        </div>
                        {size && (
                            <span style={cartItemSizeStyle}>Size: {size}</span>
                        )}
                    </div> 
                </div>
            </td>
        </tr>
    );
};

export default CartItem;
