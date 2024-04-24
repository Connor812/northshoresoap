import React from 'react'

function CartItem({ item, index, removeItem, updateQuantity, setCartItems, setSubtotal, setHst, setGrandTotal }) {

    const price = parseFloat(item.price / 100).toFixed(2);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    return (
        <div key={index} id={`item_${index}`} className="cart-item">
            <img src={item.imageUrl} alt="Product" className="cart-item-image" />
            <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <div className="cart-item-price">${price}</div>

                <div className='quantity-container'>
                    Quantity:

                    <span className='quantity-number-container'>
                        <button className="quantity-arrow-btn" onClick={() => updateQuantity(item.id, "increase", cartItems, setCartItems, setSubtotal, setHst, setGrandTotal)}>
                            <svg width="20" height="20" viewBox="0 0 16 16">
                                <path d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z" />
                            </svg>
                        </button>
                        <span className="cart-item-quantity">{item.quantity}</span>
                        <button className="quantity-arrow-btn" onClick={() => updateQuantity(item.id, "decrease", cartItems, setCartItems, setSubtotal, setHst, setGrandTotal)}>
                            <svg width="20" height="20" viewBox="0 0 16 16">
                                <path d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67" />
                            </svg>
                        </button>
                    </span>

                    <button className="cart-item-remove" onClick={() => removeItem(`item_${index}`, item.id, cartItems, setCartItems, setSubtotal, setHst, setGrandTotal)}>
                        <svg width="45" height="45" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default CartItem
