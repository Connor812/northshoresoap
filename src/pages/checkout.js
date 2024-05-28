import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../hooks/dataContext.js";
import Payment from "./payment.js";
import CheckoutCartItem from "../components/checkoutCartItem.js";
import "../assets/css/checkout.css";
import AddressForm from "../components/addressForm";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Checkout() {

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

        if (cartItems.length === 0) {
            setError("Your cart is empty");
            return;
        }

        let formId = "";

        if (shipmentMethod === "no-method") {
            setError("Please select a delivery option");
            return;
        } else if (shipmentMethod === "PICKUP") {
            formId = "pickup-form";
        } else {
            formId = "shipment-form";
        }

        const form = document.getElementById(formId);
        const formData = new FormData(form);

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

        // Form validation for delivery option
        if (shipmentMethod === "no-method") {
            setError("Please select a delivery option");
            return;
        }

        // Form validation for email
        const invalidField = shipmentMethod === "PICKUP" ? validatePickupFormData(formData) : validateShippingFormData(formData);

        if (invalidField) {
            setError(`Please check your ${invalidField}`);
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

        fetch("http://northshoresoapworks.com/createOrder.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }
            )
            .then((data) => {
                if (data.error || data.errors) {
                    console.log(data);
                    setError(data.error);
                    paymentBtn.innerHTML = "Proceed to Payment";
                    paymentBtn.disabled = false;
                } else {
                    paymentBtn.remove();
                    setError("");
                    console.log(data);
                    setStage(<Payment data={data} shipmentMethod={shipmentMethod} subTotal={subTotal} setError={setError} />);
                }
            })
            .catch((err) => {
                setError(err.message);
                paymentBtn.innerHTML = "Proceed to Payment";
                paymentBtn.disabled = false;
            });
    }

    function validateShippingFormData(formData) {
        const fields = {
            "first-name": /^[a-zA-Z]+$/,
            "last-name": /^[a-zA-Z]+$/,
            "email": /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "phone": /^(1\s?)?(\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/,
            "street": /^[a-zA-Z0-9\s]+$/,
            "apt": /^[a-zA-Z0-9\s\W]*$/,
            "city": /^[a-zA-Z\s]+$/,
            "country": /^[a-zA-Z\s]+$/,
            "postal-code": /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$|^\d{5}$/i,
            "province": /^[a-zA-Z\s]+$/
        };

        for (let field in fields) {
            if (!fields[field].test(formData.get(field))) {
                return field;
            }
        }

        return null;
    }

    function validatePickupFormData(formData) {
        const fields = {
            "first-name": /^[a-zA-Z]+$/,
            "last-name": /^[a-zA-Z]+$/,
            "email": /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "phone": /^(1\s?)?(\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/,
            "startDate": /^\d{4}-\d{2}-\d{2}$/,
        };

        for (let field in fields) {
            if (!fields[field].test(formData.get(field))) {
                return field;
            }
        }

        return null;
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
                            <img loading="lazy"
                                src="http://northshoresoapworks.com/images/bird.jpg"
                                width="120px"
                                alt="bird"
                                className="checkout-bird-img"
                            />
                        </div>
                    </div>

                    <Row className="fs-5">
                        <Col sm={5}>Product</Col>
                        <Col className="checkout-table-name text-center" sm={3}>Price</Col>
                        <Col className="checkout-table-name" sm={2}>Quantity</Col>
                        <Col className="checkout-table-name text-end" sm={2}>SubTotal</Col>
                    </Row>
                    <hr />
                    <div className="checkout-cart-list">
                        {cartItems.map((item, index) => {
                            return (
                                <CheckoutCartItem
                                    key={index}
                                    index={index}
                                    item={item}
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                    setSubtotal={setSubtotal}
                                    setHst={setHst}
                                    setGrandTotal={setGrandTotal}
                                />
                            );
                        })}
                    </div>
                    <hr className="coupon-separator" />
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
                                className="button continue-shopping-button"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="address-form-wrapper">
                <div className="white-background">
                    <img loading="lazy"
                        src="http://northshoresoapworks.com/images/logo-black.jpg"
                        className="checkout-logo"
                        alt="Logo"
                    />

                    <div
                        className="checkout-container"
                    >
                        <h1 className="text-center checkout-title">Cart Totals</h1>
                        <div style={{ width: '100%', fontSize: '18pt' }}>
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
                        <div style={{ width: '100%', fontSize: '18pt' }}>
                            <hr />
                            HST: ${(salesTax / 100).toFixed(2)}
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