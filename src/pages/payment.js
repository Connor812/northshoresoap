import React from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

const applicationId = "sq0idp-IPhH7gNDCRYpvM6bKYvb_g";
const locationId = "LE3BRNS0JXRJF";

function Payment() {

    const cardTokenizeResponseReceived = (tokenRecived) => {
        console.log("tokenRecived: ", tokenRecived);
    }

    return (
        <PaymentForm applicationId={applicationId} locationId={locationId} cardTokenizeResponseReceived={cardTokenizeResponseReceived}>
            <CreditCard />
        </PaymentForm>
    );
}

export default Payment;