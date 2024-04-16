import React, { useState } from "react";
import "../assets/css/checkout.css";
import AddressForm from "../components/addressForm";

function Checkout() {

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const [shipmentMethod, setShipmentMethod] = useState("no-method");
    const [error, setError] = useState("");

    function updateShipmentMethod(value) {
        setShipmentMethod(value);
    }

    function createOrder(e) {
        e.preventDefault();

        const form = document.getElementById("checkout-form");
        const formData = new FormData(form);

        // This checks for empty form fields
        for (let [key, value] of formData.entries()) {
            document.querySelector(`[name="${key}"]`).classList.remove("error");
            if (!value && document.querySelector(`[name="${key}"]`).hasAttribute("required")) {
                document.querySelector(`[name="${key}"]`).classList.add("error");
                setError("Please fill out all fields");
                return;
            }
        }

        // Generating the customer
        const order = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            shipmentMethod: shipmentMethod
        }

        if (shipmentMethod === "instore") {
            order.startDate = formData.get("startDate");
        }

        if (shipmentMethod === "delivery") {
            order.street = formData.get("street");
            order.apt = formData.get("apt");
            order.city = formData.get("city");
            order.country = formData.get("country");
            order.postalCode = formData.get("postal-code");
            order.province = formData.get("province");
        }

        console.log(order);

        fetch("https://localhost/NorthShoreSoapWorks/createOrder.php", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)

        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    console.log("Order created successfully");
                    console.log(data);
                }
            })
            .catch(err => {
                setError("An error occurred, please try again later");
            });
    }

    return (
        <div className="checkout-wrapper">
            <form id="checkout-form" className="checkout-container">
                <h1 className="text-center checkout-title">
                    Checkout
                </h1>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="input-container">
                    <label htmlFor="first-name" className="checkout-label">First Name:</label>
                    <input required type="text" id="first-name" className="checkout-input" placeholder="First Name" name="first-name" />
                </div>

                <div className="input-container">
                    <label htmlFor="last-name" className="checkout-label">Last Name:</label>
                    <input required type="text" id="last-name" className="checkout-input" placeholder="Last Name" name="last-name" />
                </div>

                <div className="input-container">
                    <label htmlFor="email" className="checkout-label">Email:</label>
                    <input required type="text" id="email" className="checkout-input" placeholder="Email" name="email" />
                </div>

                <div className="input-container">
                    <label htmlFor="Phone" className="checkout-label">Phone:</label>
                    <input required type="text" id="phone" className="checkout-input" placeholder="Phone" name="phone" />
                </div>

                <div className="input-container">
                    <label htmlFor="delivery-option" className="checkout-label">Delivery Option:</label>
                    <select id="delivery-option" className="checkout-input" onChange={(e) => updateShipmentMethod(e.target.value)} defaultValue="no-method" name="delivery-option" >
                        <option value="no-method" disabled>Delivery Option</option>
                        <option value="instore">Instore Pick Up</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>

                <hr />

                {shipmentMethod === "instore" && (
                    <>
                        <div className="input-container">
                            <label className="checkout-label" htmlFor="startDate">Start:</label>
                            <input required id="startDate" className="form-control" type="date" />
                        </div>
                    </>
                )}

                {shipmentMethod === "delivery" && (
                    <AddressForm createOrder={createOrder} />
                )
                }

            </form>
        </div>
    );
}

export default Checkout;
