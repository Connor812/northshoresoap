import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/thankyou.css";

function Thankyou() {

    const [copyIcon, setCopyIcon] = useState(`<svg width="25" height="25" class="copy-icon" viewBox="0 0 16 16">
    <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
</svg>`);

    const location = useLocation();
    const order = location.state.order;
    const order_id = order.payment.id;

    const handleOrderIdClick = () => {
        navigator.clipboard.writeText(order_id);
        setCopyIcon(`<svg width="25" height="25" class="copy-icon" viewBox="0 0 16 16">
        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
        <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
      </svg>`);
    };

    return (
        <div className="thankyou">
            <span>Thank You For Your Order!</span>
            <span className="fs-5 d-flex">
                Your Order Number is:&nbsp;
                <span
                    onClick={handleOrderIdClick}
                    className="fs-5"
                    style={{ cursor: "pointer" }}
                >
                    <span className="fs-5 d-flex">
                        {order_id}
                        <div dangerouslySetInnerHTML={{ __html: copyIcon }} />
                    </span>
                </span>
            </span>
            <div>
                A Recipe Will Be Sent To Your Email Shortly
            </div>
            <Link
                to="/northshoresoap"
                className="button"
            >
                Return to Home
            </Link>
        </div>
    );
}

export default Thankyou;
