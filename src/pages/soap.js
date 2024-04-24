import React, { useContext } from "react";
import randomItems from "../assets/soaps/random.json";
import ItemCard from "../components/itemCard.js";
import { DataContext } from "../hooks/dataContext.js";
import "../assets/css/soap.css";

function Soap() {
    const dataProvider = useContext(DataContext);
    const data = dataProvider.data;

    function getRandomItem() {
        return randomItems.products[Math.floor(Math.random() * randomItems.products.length)];
    }

    return (
        <>
            <main className="soap-page-wrapper">
                <div className="soap-page-wrapper-background">
                    <div className="row">
                        <div className="soap-page-side-col col-2">
                            {/* <ItemCard soap={getRandomItem()} index={0} />
                            <ItemCard soap={getRandomItem()} index={0} />
                            <ItemCard soap={getRandomItem()} index={0} /> */}
                        </div>
                        <div className="soap-middle-column">
                            <center className="soap-heading">
                                <h1>HAND MADE ARTISAN SOAP IN OUR STORE</h1>
                            </center>
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
                        <div className="soap-page-side-col col-2">
                            {/* <ItemCard soap={getRandomItem()} index={0} />
                            <ItemCard soap={getRandomItem()} index={0} />
                            <ItemCard soap={getRandomItem()} index={0} /> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default Soap;



