import React, { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/itemCard.js";
import SoapCarousel from "../components/soapCarousel.js";
import { DataContext } from "../hooks/dataContext.js";
import "../utils/filterProducts";
import "../assets/css/soap.css";
import { filterProducts } from "../utils/filterProducts";


function Soap() {
    const dataProvider = useContext(DataContext);
    const data = dataProvider.data;

    const handMadeSoaps = filterProducts(data, "OLETSRZV2TEPVL3SALMWIC6Y");
    const barSoaps = filterProducts(data, "IC6GDQ6YPEVHMPWYVEWEBZ6Q");
    const liquidSoap = filterProducts(data, "DOYWLZK67VKSWTA5XIW3UQLA");

    return (
        <>
            <main className="soap-page-wrapper">
                <div className="soap-page-wrapper-background">
                    <div className="row">
                        <div className="soap-middle-column">
                            <center className="soap-heading">
                                <h1>
                                    <Link className="back-button" to="/northshoresoap">
                                        <svg width="25" height="25" viewBox="0 0 16 16">
                                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                                        </svg>
                                        Back
                                    </Link>
                                    Soaps
                                </h1>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dolore. Facere, quasi quam amet hic saepe eius modi voluptatem ea numquam vitae, eos non autem quod similique consequuntur veritatis. Facilis!</p>

                                <SoapCarousel />

                            </center>
                            <div id="links-to-categories-container" className="links-to-categories-container">
                                <div className="links-to-categories">
                                    <a href="#handmade-soaps">Homemade Soaps</a>
                                    <a href="#bar-soaps">Bars of Soaps</a>
                                    <a href="#liquid-soap">Liquid Soap</a>
                                </div>
                                <hr />
                            </div>
                            <h1 id="handmade-soaps" className="text-center handmade-soap-header">
                                HAND MADE ARTISAN SOAP IN OUR STORE
                            </h1>
                            <hr />
                            <center>


                                <section id="soap-page-soap-wrapper" className="soap-page-soap-wrapper">
                                    {handMadeSoaps.length === 0 ? <p className="fs-3">No Soaps</p> :
                                        handMadeSoaps.map((soap, index) => {
                                            return (
                                                <ItemCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                            )
                                        })}
                                </section>
                                <center id="bar-soaps" className="soap-heading">
                                    <h1>Bars of Soap</h1>
                                    <hr />
                                </center>
                                <section className="soap-page-soap-wrapper">
                                    {barSoaps.length === 0 ? <p className="fs-3">No Regular Soaps</p> :
                                        barSoaps.map((soap, index) => {
                                            return (
                                                <ItemCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                            )
                                        })}
                                </section>
                                <center id="liquid-soap" className="soap-heading">
                                    <h1>Liquid Soap</h1>
                                </center>
                                <section className="soap-page-soap-wrapper">
                                    {liquidSoap.length === 0 ? <p className="fs-3">No Regular Soaps</p> :
                                        liquidSoap.map((soap, index) => {
                                            return (
                                                <ItemCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                            )
                                        })}
                                </section>
                            </center>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
}


export default Soap;



