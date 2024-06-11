import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { removeItem } from "../utils/removeItemFromCard.js";
import { useUpdateQuantity } from "../utils/updateQuantity.js";

function CheckoutCartItem({ index, item, cartItems, setCartItems, subTotal, setSubtotal, hst, setHst, setGrandTotal }) {

    const updateQuantity = useUpdateQuantity();

    const price = parseFloat((item.price / 100)).toFixed(2);
    const subTotalPrice = (price * item.quantity).toFixed(2);

    function handleGiftWrap(e) {
        const checked = e.target.checked;
        const itemName = e.target.getAttribute("itemName");
        const giftwrapId = "KS57CPHD3K43BWOKJFBS2KN4";
        const giftwrapPrice = 600;
        const giftwrapName = "Gift Wrap";

        if (checked) {

            const quantity = 1;

            // Retrieve existing cart items from local storage or initialize an empty array
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            const newItem = {
                id: giftwrapId,
                name: giftwrapName,
                quantity: quantity,
                price: parseFloat(giftwrapPrice),
                imageUrl: "No Image",
                description: "Gift Wrap",
                note: itemName
            };

            // Add the new item to the cart
            existingCartItems.push(newItem);

            // Log the updated cart items for debugging
            console.log('Updated Cart Items:', existingCartItems);

            // Update local storage with the new cart items
            localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

            // Calculate the updated totals
            const updatedSubTotal = existingCartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0).toFixed(2);
            const updatedHst = (updatedSubTotal * 0.13).toFixed(2);
            const updatedGrandTotal = (parseFloat(updatedSubTotal) + parseFloat(updatedHst)).toFixed(2);

            // Log the updated totals for debugging
            console.log('Updated Subtotal:', updatedSubTotal);
            console.log('Updated HST:', updatedHst);
            console.log('Updated Grand Total:', updatedGrandTotal);

            // Update the state with the new cart items and totals
            setCartItems(existingCartItems);
            setSubtotal(updatedSubTotal);
            setHst(updatedHst);
            setGrandTotal(updatedGrandTotal);

        } else {
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const filteredCartItems = existingCartItems.filter(item => item.id !== giftwrapId);
            localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));

            const updatedSubTotal = filteredCartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2);
            const updatedHst = (updatedSubTotal * 0.13).toFixed(2);
            const updatedGrandTotal = (parseFloat(updatedSubTotal) + parseFloat(updatedHst)).toFixed(2);
            setCartItems(filteredCartItems);
            setSubtotal(updatedSubTotal);
            setHst(updatedHst);
            setGrandTotal(updatedGrandTotal);
        }
    }

    return (
        <Row className="checkout-cart-item">

            <Col sm={12} md={5} className="checkout-item-name">
                <input type="checkbox" className="gift-wrap-checkbox" style={{ marginRight: "20px", width: "20px", height: "20px" }} itemName={item.name} onClick={(e) => handleGiftWrap(e)} />
                <img loading="lazy" className="checkout-cart-item-img" src={item.imageUrl} alt={item.name} />
                <h4>{item.name}</h4>
            </Col>


            <Col className="checkout-price" sm={12} md={3}>
                ${price}
            </Col>

            <Col sm={12} md={3} className="checkout-quantity-wrapper">
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
                <button className="remove-item-btn" onClick={() => removeItem(`item_${index}`, item.id, cartItems, setCartItems, setSubtotal, setHst, setGrandTotal)}>
                    <svg width="25" height="25" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </button>
            </Col>

            <Col className="checkout-subtotal text-end" sm={12} md={1}>
                ${subTotalPrice}
            </Col>
            <hr />
        </Row>
    );
}

export default CheckoutCartItem;