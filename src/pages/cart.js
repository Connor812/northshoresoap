import React, { useContext } from "react";
import { DataContext } from "../hooks/dataContext.js";
import CartItem from "../components/cartItem.js";
import { Link } from "react-router-dom";
import { removeItem } from "../utils/removeItemFromCard.js";
import { useUpdateQuantity } from "../utils/updateQuantity.js";
import "../assets/css/cart.css";

function Cart() {
   const {
      cartItems,
      setCartItems,
      subTotal,
      setSubtotal,
      hst,
      setHst,
      grandTotal,
      setGrandTotal,
   } = useContext(DataContext);
   const updateQuantity = useUpdateQuantity();

   return (
      <div
         className="modal fade"
         id="cart-modal"
         data-bs-backdrop="static"
         data-bs-keyboard="false"
         tabIndex="-1"
         aria-labelledby="staticBackdropLabel"
         aria-hidden="true"
      >
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content cart-modal">
               <div className="cart-modal-header">
                  <center>
                     <img
                        src="http://northshoresoapworks.com/images/logo.png"
                        alt="Logo"
                        className="cart-header-image"
                        height="auto"
                     />
                  </center>
                  <button
                     type="button"
                     className="cart-modal-close-btn"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  >
                     <svg
                        width="45"
                        height="45"
                        viewBox="0 0 16 16"
                     >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                     </svg>
                  </button>
               </div>
               <div className="modal-body">
                  <main className="">
                     <section className="cart">
                        <h1 className="cart-title p-3 pt-0">Your Cart</h1>
                        <div className="cart-items">
                           {cartItems.length === 0 ? (
                              <div className="empty-cart">Your cart is empty</div>
                           ) : (
                              cartItems.map((item, index) => {
                                 return (
                                    <CartItem
                                       key={index}
                                       item={item}
                                       index={index}
                                       removeItem={removeItem}
                                       updateQuantity={updateQuantity}
                                       setCartItems={setCartItems}
                                       setSubtotal={setSubtotal}
                                       setHst={setHst}
                                       setGrandTotal={setGrandTotal}
                                    />
                                 );
                              })
                           )}
                        </div>
                        <div className="cart-total">
                           <hr />
                           <div className="cart-total-amount">
                              SubTotal: ${parseFloat(subTotal / 100).toFixed(2)}
                           </div>
                           <div className="cart-total-hst">
                              HST: ${parseFloat(hst / 100).toFixed(2)}
                           </div>
                           <hr />
                           <div className="cart-total-grand">
                              Grand Total: ${parseFloat(grandTotal / 100).toFixed(2)}
                           </div>
                           <center>
                              {cartItems.length === 0 ? null : (
                                 <Link
                                    to={{
                                       pathname: "/checkout",
                                       state: { cartItems: cartItems },
                                    }}
                                 >
                                    <button
                                       data-bs-dismiss="modal"
                                       className="checkout-btn"
                                    >
                                       Checkout
                                    </button>
                                 </Link>
                              )}
                           </center>
                        </div>
                     </section>
                  </main>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Cart;
