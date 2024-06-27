import React, { useState, useEffect } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function Payment({ data, shipmentMethod, subTotal, setError }) {
    const order = data.order;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [applicationId, setApplication] = useState(null);
    const [locationId, setLocationId] = useState(null);

    useEffect(() => {
        if (!order) {
            setError("No order found");
            return;
        }

        fetch("https://northshoresoapworks.com/applicationId.php", {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch application ID");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data && data.applicationId && data.locationId) {
                    setApplication(data.applicationId);
                    setLocationId(data.locationId);
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error.message || "An error occurred");
            });
    }, [order]);

    const cardTokenizeResponseReceived = (tokenReceived) => {
        if (tokenReceived.status !== "OK") {
            setError(tokenReceived.errors[0].detail);
            return;
        }

        const token = tokenReceived.token;

        const orderDetails = {
            amount: order.total_money.amount,
            order_id: order.id,
            customer_id: order.customer_id,
            display_name: order.fulfillments[0]?.shipment_details?.recipient?.address?.display_name || order.fulfillments[0]?.pickup_details?.recipient?.display_name,
            email: order.fulfillments[0]?.shipment_details?.recipient?.email_address || order.fulfillments[0]?.pickup_details?.recipient?.email_address,
            street: order.fulfillments[0]?.shipment_details?.recipient?.address?.address_line_1,
            city: order.fulfillments[0]?.shipment_details?.recipient?.address?.locality,
            province: order.fulfillments[0]?.shipment_details?.recipient?.address?.administrative_district_level_1,
            postal_code: order.fulfillments[0]?.shipment_details?.recipient?.address?.postal_code,
            country: order.fulfillments[0]?.shipment_details?.recipient?.address?.country,
            shipment_method: shipmentMethod,
            sub_total: subTotal,
            token: token,
        };

        fetch("https://northshoresoapworks.com/payment.php", {
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
                console.log(data);
                if (data.error) {
                    setError(data.error);
                    return;
                }
                localStorage.setItem("cartItems", JSON.stringify([]));
                navigate("/thankyou", { state: { order: data } });
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Failed to process payment");
            });
    };

    return (
        <center className="payment">

            {
                loading ? <Spinner /> :
                    <PaymentForm applicationId={applicationId} locationId={locationId} cardTokenizeResponseReceived={cardTokenizeResponseReceived}>
                        <CreditCard />
                    </PaymentForm>
            }


        </center>
    );
}

export default Payment;
