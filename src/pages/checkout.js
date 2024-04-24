import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../hooks/dataContext.js";
import Payment from "./payment.js";
import CheckoutCartItem from "../components/checkoutCartItem.js";
import "../assets/css/checkout.css";
import AddressForm from "../components/addressForm";
import { Button, Collapse } from 'react-bootstrap';

function Checkout() {

    const {
        cartItems,
        subTotal,
        hst,
        grandTotal
    } = useContext(DataContext);
    const [shipmentMethod, setShipmentMethod] = useState("no-method");
    const [shippingCost, setShippingCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");
    const [stage, setStage] = useState("address-form");
    const [salesTax, setSalesTax] = useState(hst);

    function updateTax(shippingAmount) {
        const newHst = ((parseFloat(subTotal) + shippingAmount) * 0.13).toFixed(2);
        setSalesTax(newHst);
    }

    function createOrder(e) {
        e.preventDefault();
        let formId = "";

        console.log(shipmentMethod);

        if (shipmentMethod === "no-method") {
            setError("Please select a delivery option");
            return;
        } else if (shipmentMethod === "PICKUP") {
            formId = "pickup-form";
        } else {
            formId = "shipment-form";
        }
        console.log(formId);
        const form = document.getElementById(formId);
        console.log(form);
        const formData = new FormData(form);
        console.log(formData);

        // This checks for empty form fields
        for (let [key, value] of formData.entries()) {
            document.querySelector(`[name="${key}"]`).classList.remove("error");
            if (
                !value &&
                document.querySelector(`[name="${key}"]`).hasAttribute("required")
            ) {
                document.querySelector(`[name="${key}"]`).classList.add("error");
                setError("Please fill out all fields");
                return;
            }
        }
        console.log("creating order");
        // Form validation for delivery option
        if (shipmentMethod === "no-method") {
            console.log("no delivery option");
            console.log(shipmentMethod + "<---");
            setError("Please select a delivery option");
            return;
        }

        if (!validateEmail(formData.get("email"))) {
            setError("Please enter a valid email address");
            return;
        }

        // Generating the customer
        const order = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            shipmentMethod: shipmentMethod,
        };

        if (shipmentMethod === "PICKUP") {
            order.startDate = formData.get("startDate");
        }

        if (shipmentMethod === "SHIPMENT") {
            order.street = formData.get("street");
            order.apt = formData.get("apt");
            order.city = formData.get("city");
            order.country = formData.get("country");
            order.postalCode = formData.get("postal-code");
            order.province = formData.get("province");
        }

        // Generating the order items
        const lineItems = cartItems.map((item) => {
            return {
                catalog_object_id: item.id,
                quantity: item.quantity.toString(),
                item_type: "ITEM",
            };
        });

        order.lineItems = lineItems;

        // Make the button loading

        const loadingSpinner = `<div class="spinner-border checkout-spinner" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`;

        const paymentBtn = document.getElementById("payment-btn");

        paymentBtn.innerHTML = loadingSpinner;
        paymentBtn.disabled = true;

        fetch("https://localhost/NorthShoreSoapWorks/createOrder.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setError(data.errors[0].detail);
                    paymentBtn.innerHTML = "Proceed to Payment";
                    paymentBtn.disabled = false;
                } else {
                    console.log("Order created successfully");
                    console.log(data);
                    paymentBtn.remove();
                    setError("");
                    setStage(<Payment order={data} />);
                }
            })
            .catch((err) => {
                setError(err.error);
                paymentBtn.innerHTML = "Proceed to Payment";
                paymentBtn.disabled = false;
            });
    }

    function validateEmail(email) {
        var re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <main className="checkout-wrapper">
            <div className="cart-contents">
                <div>
                    <div className="p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="text-start">Checkout</h1>
                            <p>Thanks For Shopping With Us and Don't Forget Your Flowers!</p>
                        </div>
                        <div>
                            <img
                                src="http://northshoresoapworks.com/images/bird.jpg"
                                width="120px"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between fs-5">
                        <div>Product</div>
                        <div className="item-labels d-flex justify-content-between">
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>SubTotal</div>
                        </div>
                    </div>
                    <hr />
                    <ul className="checkout-cart-list">
                        {cartItems.map((item, index) => {
                            return (
                                <CheckoutCartItem
                                    key={index}
                                    index={index}
                                    item={item}
                                    cartItems={cartItems}
                                />
                            );
                        })}
                    </ul>
                </div>
                <div className="coupon-code-section">
                    <div className="d-flex justify-content-between pb-4">
                        <div>
                            <input
                                className="coupon-code"
                                placeholder="COUPON CODE"
                                type="text"
                            />
                            <button className="button">Apply</button>
                        </div>
                        <div>
                            <Link
                                to="/soap"
                                className="button"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="address-form-wrapper">
                <div className="white-background">
                    <img
                        src="http://northshoresoapworks.com/images/logo-black.jpg"
                        className="checkout-logo"
                        alt="Logo"
                    />

                    <div
                        className="checkout-container"
                    >
                        <h1 className="text-center checkout-title">Checkout</h1>
                        <div style={{ width: '100%' }}>
                            <hr />
                            Subtotal: ${(subTotal / 100).toFixed(2)}
                            <hr />
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        {stage === "address-form" ? (
                            <AddressForm
                                shipmentMethod={shipmentMethod}
                                setShipmentMethod={setShipmentMethod}
                                setShippingCost={setShippingCost}
                                updateTax={updateTax}
                            />
                        ) : (
                            stage
                        )}
                        <div style={{ width: '100%' }}>
                            <hr />
                            HST: ${salesTax / 100}
                            <br />
                            Shipping: ${(shippingCost / 100).toFixed(2)}
                            <br />
                            Discount: -${discount.toFixed(2)}
                            <hr />
                            Grand Total: ${((subTotal / 100 + shippingCost / 100 - discount) * 1.13).toFixed(2)}
                            <div className="input-container">
                                <button id="payment-btn" className="button" onClick={(e) => createOrder(e)} type="submit">Proceed To Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;

