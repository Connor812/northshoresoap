import React, { useState } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useNavigate } from "react-router-dom";

const applicationId = "sq0idp-IPhH7gNDCRYpvM6bKYvb_g";
const locationId = "LE3BRNS0JXRJF";

function Payment({ order }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    if (!order) {
        setError("No order found");
    }

    const total = order.order.total_money.amount;
    const orderId = order.order.id;
    const customerId = order.order.customer_id;

    const orderDetails = {
        amount: total,
        order_id: orderId,
        customer_id: customerId,
    }

    const cardTokenizeResponseReceived = (tokenReceived) => {

        // Handles if there is an error from the response
        if (tokenReceived.status !== "OK") {
            setError(tokenReceived.errors[0].detail);
            return;
        }

        const token = tokenReceived.token;

        orderDetails.token = "cnon:card-nonce-ok";
        // Use fetch to send the nonce to the server
        fetch("https://localhost/NorthShoreSoapWorks/payment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderDetails }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorInfo) => Promise.reject(new Error(JSON.stringify(errorInfo))));
                }
                return response.json();
            })
            .then((data) => {
                if (data.errors) {
                    console.log("error");
                    setError(data.errors.detail);
                    return;
                }
                console.log(data);
                localStorage.setItem("cartItems", JSON.stringify([]));
                navigate("/thankyou", { state: { order: data } });

            })
            .catch((error) => {
                console.error("Error:", error);
            });


    }

    // # Apple Pay For The Future
    // const createPaymentRequest = () => {
    //     return {
    //         requestShippingContact: true,
    //         requestBillingInfo: true,
    //         currencyCode: "USD",
    //         countryCode: "US",
    //         total: {
    //             label: "MERCHANT NAME",
    //             amount: "100",
    //             pending: false,
    //         },
    //         lineItems: [
    //             {
    //                 label: "Subtotal",
    //                 amount: "100",
    //                 pending: false,
    //             },
    //         ],
    //     };
    //     createPaymentRequest = { createPaymentRequest }
    // };

    return (
        <div className="payment">
            <PaymentForm applicationId={applicationId} locationId={locationId} cardTokenizeResponseReceived={cardTokenizeResponseReceived} >
                <CreditCard />
            </PaymentForm>
        </div>
    );
}

export default Payment;