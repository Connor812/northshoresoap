import React, { useState } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useNavigate } from "react-router-dom";

const applicationId = "sq0idp-IPhH7gNDCRYpvM6bKYvb_g";
const locationId = "LE3BRNS0JXRJF";

function Payment({ data, shipmentMethod, subTotal }) {
    const order = data.order
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    if (!order) {
        setError("No order found");
    }

    const total = order.total_money.amount;
    const orderId = order.id;
    const customerId = order.customer_id;
    const firstName = order.fulfillments[0].shipment_details.recipient.address.first_name;
    const lastName = order.fulfillments[0].shipment_details.recipient.address.last_name;
    const email = order.fulfillments[0].shipment_details.recipient.email_address;
    const street = order.fulfillments[0].shipment_details.recipient.address.address_line_1;
    const city = order.fulfillments[0].shipment_details.recipient.address.locality;
    const province = order.fulfillments[0].shipment_details.recipient.address.administrative_district_level_1;
    const postalCode = order.fulfillments[0].shipment_details.recipient.address.postal_code;
    const country = order.fulfillments[0].shipment_details.recipient.address.country;

    const orderDetails = {
        amount: total,
        order_id: orderId,
        customer_id: customerId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        street: street,
        city: city,
        province: province,
        postal_code: postalCode,
        country: country,
        shipment_method: shipmentMethod,
        sub_total: subTotal,
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
        fetch("http://northshoresoapworks.com/payment.php", {
            method: "POST",
            mode: 'cors', 
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

    return (
        <center className="payment">
            <PaymentForm applicationId={applicationId} locationId={locationId} cardTokenizeResponseReceived={cardTokenizeResponseReceived} >
                <CreditCard />
            </PaymentForm>
        </center>
    );
}

export default Payment;