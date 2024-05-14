import React, { useContext } from "react";
import ItemCard from "../components/itemCard.js";
import SoapCarousel from "../components/soapCarousel.js";
import { DataContext } from "../hooks/dataContext.js";

import "../assets/css/soap.css";


function Soap() {
    const dataProvider = useContext(DataContext);
    const data = dataProvider.data;

    console.log(data);

    return (
        <>
            <main className="soap-page-wrapper">
                <div className="soap-page-wrapper-background">
                    <div className="row">
                        <div className="soap-middle-column">
                            <center className="soap-heading">
                                <h1>
                                    Soaps
                                </h1>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dolore. Facere, quasi quam amet hic saepe eius modi voluptatem ea numquam vitae, eos non autem quod similique consequuntur veritatis. Facilis!</p>

                                <SoapCarousel />

                            </center>
                            <h1 className="text-center handmade-soap-header">HAND MADE ARTISAN SOAP IN OUR STORE</h1>
                            <hr />
                            <section className="soap-page-soap-wrapper">
                                {data.length === 0 ? <p className="fs-3">Error Getting Soaps</p> :
                                    data.objects.map((soap, index) => {
                                        return (
                                            <ItemCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                        )
                                    })}
                            </section>
                            <center className="soap-heading">
                                <h1>HAND MADE ARTISAN SOAP IN OUR STORE</h1>
                            </center>
                            {/* <section className="soap-page-soap-wrapper">
                                {data.objects.map((soap, index) => {
                                    return (
                                        <ItemCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                    )
                                })}
                            </section> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default Soap;



