import React, { useState } from "react";
import CartItem from "../components/cartItem.js";
import { Link } from 'react-router-dom';
import "../assets/css/cart.css";

function Cart() {

   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

   const [subTotal, setSubtotal] = useState(cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2));
   const [hst, setHst] = useState((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 0.13).toFixed(2));
   const [grandTotal, setGrandTotal] = useState((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 1.13).toFixed(2));

   function removeItem(itemElememt, itemId) {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      const updatedSubTotal = updatedCartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2);
      const updatedHst = (updatedSubTotal * 0.13).toFixed(2);
      const updatedGrandTotal = (parseFloat(updatedSubTotal) + parseFloat(updatedHst)).toFixed(2);

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setSubtotal(updatedSubTotal);
      setHst(updatedHst);
      setGrandTotal(updatedGrandTotal);
   }

   function updateQuantity(itemId, action) {
      const updatedCartItems = cartItems.map(item => {
         if (item.id === itemId) {
            if (action === "increase") {
               return { ...item, quantity: item.quantity + 1 };
            } else if (action === "decrease" && item.quantity > 1) {
               return { ...item, quantity: item.quantity - 1 };
            }
         }
         return item;
      });

      const updatedSubTotal = updatedCartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2);
      const updatedHst = (updatedSubTotal * 0.13).toFixed(2);
      const updatedGrandTotal = (parseFloat(updatedSubTotal) + parseFloat(updatedHst)).toFixed(2);

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setSubtotal(updatedSubTotal);
      setHst(updatedHst);
      setGrandTotal(updatedGrandTotal);
   }

   return (
      <main className="cart-wrapper">

         <section className="cart">
            <h1 className="cart-title">Your Cart</h1>
            <div className="cart-items">

               {cartItems.length === 0 ? (
                  <div className="empty-cart">Your cart is empty</div>
               ) : (
                  cartItems.map((item, index) => {
                     return (
                        <CartItem key={index} item={item} index={index} removeItem={removeItem} updateQuantity={updateQuantity} />
                     )
                  })
               )}
               <div className="cart-total">
                  <hr />
                  <div className="cart-total-amount">
                     SubTotal: ${subTotal}
                  </div>
                  <div className="cart-total-hst">
                     HST: ${hst}
                  </div>
                  <hr />
                  <div className="cart-total-grand">
                     Grand Total: ${grandTotal}
                  </div>
                  <center>
                     <Link className="checkout-btn" to="/checkout">Checkout</Link>
                  </center>
               </div>
            </div>
         </section>
      </main >
   );
}

export default Cart;