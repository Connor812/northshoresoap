import React from "react";
import "../assets/css/cart.css";

function Cart() {

   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

   function removeItem(itemElememt, itemId) {

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      console.log(itemElememt, itemId);

      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      const itemElement = document.getElementById(itemElememt);
      itemElement.remove();

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

                        <div key={index} id={`item_${index}`} className="cart-item">
                           <img src={item.imageUrl} alt="Product" width="150" height="auto" className="cart-item-image" />
                           <div className="cart-item-details">
                              <h2 className="cart-item-name">{item.name}</h2>
                              <div className="cart-item-price">${item.price}</div>
                              <div>
                                 <span className="cart-item-quantity">Quantity: {item.quantity}</span>
                                 <button className="cart-item-remove" onClick={() => removeItem(`item_${index}`, item.id)}>
                                    <svg width="45" height="45" className="bi bi-x" viewBox="0 0 16 16">
                                       <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                 </button>
                              </div>
                           </div>
                        </div>
                     )
                  })
               )}
            </div>


         </section>



      </main>
   );
}

export default Cart;