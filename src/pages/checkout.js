import React, { useState, useContext, useMemo } from "react";
import { DataContext } from "../hooks/dataContext.js";
import Payment from "./payment.js";
import CheckoutCartItem from "../components/checkoutCartItem.js";
import AddressForm from "../components/addressForm";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomeSoapCard from "../components/homeSoapCard.js";
import Spinner from 'react-bootstrap/Spinner';
import { removeItem } from "../utils/removeItemFromCard.js";
import "../assets/css/checkout.css";

function Checkout() {
    const {
        data,
        cartItems,
        setCartItems,
        subTotal,
        setSubtotal,
        hst,
        setHst,
        loading,
        setGrandTotal,
    } = useContext(DataContext);
    const [shipmentMethod, setShipmentMethod] = useState("no-method");
    const [shippingCost, setShippingCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");
    const [stage, setStage] = useState("address-form");
    const [showGiftWrap, setShowGiftWrap] = useState(true);
    const [billingAddress, setBillingAddress] = useState(false);

    function updateTax(shippingAmount) {
        const newHst = ((parseFloat(subTotal) + (shippingAmount)) * 0.13).toFixed(2);
        setHst(newHst);
    }

    function createOrder(e) {
        e.preventDefault();
        setError("");

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
            address: {}
        };

        if (shipmentMethod === "PICKUP") {
            order.startDate = formData.get("startDate");
            order.address.street = formData.get("street");
            order.address.apt = formData.get("apt");
            order.address.city = formData.get("city");
            order.address.country = formData.get("country");
            order.address.postalCode = formData.get("postal-code");
            order.address.province = formData.get("province");
        }

        if (shipmentMethod === "SHIPMENT") {
            order.address.street = formData.get("street");
            order.address.apt = formData.get("apt");
            order.address.city = formData.get("city");
            order.address.country = formData.get("country");
            order.address.postalCode = formData.get("postal-code");
            order.address.province = formData.get("province");

            if (billingAddress) {
                const billingAddressForm = document.getElementById("billing-address");
                const billingAddressFormData = new FormData(billingAddressForm);

                // This checks for empty form fields
                for (let [key, value] of billingAddressFormData.entries()) {
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

                const invalidField = validateBillingFormData(billingAddressFormData);

                if (invalidField) {
                    setError(`Please check your ${invalidField}`);
                    return;
                }
                console.log(billingAddressFormData);

                order.billingAddress = {
                    street: billingAddressFormData.get("billing-address-street"),
                    apt: billingAddressFormData.get("billing-address-apt"),
                    city: billingAddressFormData.get("billing-address-city"),
                    country: billingAddressFormData.get("billing-address-country"),
                    postalCode: billingAddressFormData.get("billing-address-postal-code"),
                    province: billingAddressFormData.get("billing-address-province"),
                };
            }
        }


        // Generating the order items
        const lineItems = cartItems.map((item) => {

            if (item.name === "Gift Wrap") {
                return {
                    catalog_object_id: item.id,
                    quantity: item.quantity.toString(),
                    item_type: "ITEM",
                    note: item.note
                }
            }

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

        fetch("https://northshoresoapworks.com/createOrder.php", {
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
                    setError(data.error);
                    paymentBtn.innerHTML = "Proceed to Payment";
                    paymentBtn.disabled = false;
                } else {
                    paymentBtn.remove();
                    setError("");
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
            "street": /^[a-zA-Z0-9\s]+$/,
            "apt": /^[a-zA-Z0-9\s\W]*$/,
            "city": /^[a-zA-Z\s]+$/,
            "country": /^[a-zA-Z\s]+$/,
            "postal-code": /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$|^\d{5}$/i,
            "province": /^[a-zA-Z\s]+$/,
            "startDate": /^\d{4}-\d{2}-\d{2}$/,
        };

        for (let field in fields) {
            if (!fields[field].test(formData.get(field))) {
                return field;
            }
        }

        return null;
    }

    function validateBillingFormData(formData) {
        const fields = {
            "billing-address-street": /^[a-zA-Z0-9\s]+$/,
            "billing-address-apt": /^[a-zA-Z0-9\s\W]*$/,
            "billing-address-city": /^[a-zA-Z\s]+$/,
            "billing-address-country": /^[a-zA-Z\s]+$/,
            "billing-address-postal-code": /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$|^\d{5}$/i,
            "billing-address-province": /^[a-zA-Z\s]+$/
        }

        for (let field in fields) {
            if (!fields[field].test(formData.get(field))) {
                return field;
            }
        }

        return null;

    }

    function getRandomItems(arr, n) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    const randomItems = useMemo(() => {
        if (loading || !data.objects) return [];
        return getRandomItems(data.objects, 5);
    }, [data.objects, loading]);

    function addGiftWrap() {
        const giftWrap = {
            id: "KS57CPHD3K43BWOKJFBS2KN4",
            name: "Gift Wrap",
            quantity: 1,
            price: 600,
            imageUrl: "https://northshoresoapworks.com/images/gift-wrap.jpg",
            description: "Add a gift wrap to your order"
        };

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = existingCartItems.findIndex(item => item.id === giftWrap.id);


        const newCartItems = [...cartItems, giftWrap];
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));

        // Update Price
        const newSubTotal = parseInt(subTotal) + giftWrap.price;
        setSubtotal(newSubTotal);
        const newHst = ((newSubTotal + shippingCost) * 0.13).toFixed(2);
        setHst(newHst);

    }

    const handleGiftWrap = (e) => {
        const checked = e.target.checked;
        if (checked) {
            addGiftWrap();
        }
        else {
            removeItem(``, "KS57CPHD3K43BWOKJFBS2KN4", cartItems, setCartItems, setSubtotal, setHst, setGrandTotal);
        }
    }

    return (
        <main className="checkout-wrapper">
            <div className="cart-contents">
                <div>
                    <div className="p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="text-start">Checkout</h1>
                            <p>Thanks For Shopping With Us and Don't Forget Your Gift Wrap!</p>
                        </div>
                        <div>
                            <img loading="lazy"
                                src="https://northshoresoapworks.com/images/bird.jpg"
                                width="120px"
                                alt="bird"
                                className="checkout-bird-img"
                            />
                        </div>
                    </div>

                    <Row className="fs-6">
                        <Col sm={5}>Products</Col>
                        <Col className="checkout-table-name text-center" sm={3}>Price</Col>
                        <Col className="checkout-table-name" sm={2}>Quantity</Col>
                        <Col className="checkout-table-name text-end" sm={2}>SubTotal</Col>
                    </Row>
                    <hr />
                    <div className="checkout-cart-list">
                        {cartItems.length == 0
                            ? <center>No Items In Cart</center>
                            : cartItems.map((item, index) => {
                                return (
                                    <CheckoutCartItem
                                        key={index}
                                        index={index}
                                        item={item}
                                        cartItems={cartItems}
                                        setCartItems={setCartItems}
                                        subTotal={subTotal}
                                        setSubtotal={setSubtotal}
                                        hst={hst}
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
                    </div>
                </div>
                <div className="suggested-products">
                    <h1>
                        You might also like…
                    </h1>

                    <div className="suggested-products-list">
                        {
                            loading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : (
                                randomItems.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <HomeSoapCard soap={item} related_objects={data.related_objects} index={index}></HomeSoapCard>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="address-form-wrapper">
                <div className="white-background">
                    <img loading="lazy"
                        src="https://northshoresoapworks.com/images/logo-black.jpg"
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
                                billingAddress={billingAddress}
                                setBillingAddress={setBillingAddress}
                                stage={stage}
                            />
                        ) : (
                            stage
                        )}
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                {stage !== "address-form" ? "" :
                                    <>
                                        <input
                                            type="checkbox"
                                            id="gift-wrap"
                                            aria-label="Shipment or Pickup"
                                            aria-controls="address-form"
                                            style={{ marginRight: '10px', width: '20px', height: "20px" }}
                                            onChange={(e) => handleGiftWrap(e)}
                                        />
                                        <label htmlFor="gift-wrap">Gift Wrap</label>
                                    </>
                                }
                            </div>
                            <div>
                                $6.00
                            </div>
                        </div>
                        <div style={{ width: '100%', fontSize: '18pt' }}>
                            <hr />
                            Shipping: ${(shippingCost / 100).toFixed(2)}
                            <br />
                            HST: ${(hst / 100).toFixed(2)}
                            <br />
                            Discount: -${discount.toFixed(2)}
                            <hr />
                            Grand Total: ${(((subTotal / 100) + (shippingCost / 100) - discount) * 1.13).toFixed(2)}
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
