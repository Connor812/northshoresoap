import React from "react";
import soaps from "../assets/soaps/soaps.json";
import { SoapCard, SoapCardModal } from "../components/soapCard.js";
import "../assets/css/soap.css";

function Soap() {

    return (
        <>
            <main className="soap-page-wrapper">
                <div className="soap-page-wrapper-background">
                    <center className="soap-heading">
                        <h1>HAND MADE ARTISAN SOAP IN OUR STORE</h1>
                    </center>

                    <section className="soap-page-soap-wrapper">
                        {soaps.products.map((soap, index) => {
                            return (
                                <SoapCard key={index} soap={soap} index={index} />
                            )
                        })}
                    </section>

                    <center className="soap-heading">
                        <h1>HAND MADE ARTISAN SOAP IN OUR STORE</h1>
                    </center>
                </div >
            </main >
            <div id="modal-container">
                {soaps.products.map((soap, index) => {
                    return (
                        <SoapCardModal key={index} soap={soap} index={index} />
                    )
                })}
            </div>
        </>
    );
}

export default Soap;



