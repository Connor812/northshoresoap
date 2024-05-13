import React from "react";
import { removeItem } from "../utils/removeItemFromCard.js";
import { useUpdateQuantity } from "../utils/updateQuantity.js";

function CheckoutCartItem({ index, item, cartItems, setCartItems, setSubtotal, setHst, setGrandTotal }) {

    const updateQuantity = useUpdateQuantity();

    const price = parseFloat((item.price / 100)).toFixed(2);
    const subTotalPrice = (price * item.quantity).toFixed(2);

    return (
        <>
            <li className="checkout-cart-item">
                <img className="checkout-cart-item-img" src={item.imageUrl} alt={item.name} />
                <div className="checkout-cart-item-details">

                    <div class="checkout-item-name">
                        <h2>{item.name}</h2>
                    </div>

                    <div class="checkout-item-price">
                        ${price}
                    </div>

                    <div className="checkout-quantity-wrapper">
                        <div className="checkout-quantity-container">
                            <button className="quantity-btn"
                                onClick={() => updateQuantity(item.id, "decrease")}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                </svg>
                            </button>
                            <div className="px-3">
                                {item.quantity}
                            </div>
                            <button className="quantity-btn" onClick={() => updateQuantity(item.id, "increase")}>
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <p>${subTotalPrice}</p>
                    </div>

                    <button className="remove-item-btn" onClick={() => removeItem(`item_${index}`, item.id, cartItems, setCartItems, setSubtotal, setHst, setGrandTotal)}>
                        <svg width="25" height="25" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </button>
                </div>
            </li>
            <hr />
        </>
    );
}

export default CheckoutCartItem;
