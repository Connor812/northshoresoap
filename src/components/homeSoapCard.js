import React from "react";
import { addItemToCart } from "../utils/addItemToCart.js";

function HomeSoapCard({ soap, index }) {
    const soapIndex = `soap_${index}`;
    return (
        <React.Fragment key={index}>
            <button data-bs-toggle="modal" data-bs-target={`#${soapIndex}`} key={soap.id} className="soap-card">
                <img src={soap.image} alt={soap.name} className="soap-card-img" />
                <h6>{soap.name}</h6>
            </button>

            <div className="modal fade" id={`${soapIndex}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body soap-display">
                            <div className="close-btn-container">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="left-side">
                                <img src="http://northshoresoapworks.com/images/white_bg_logo.jpg" alt="logo" className="soap-logo" />
                                <img src={soap.image} alt={soap.name} className="soap-image" />
                                <h6 className="natural-ingredients">
                                    <u>
                                        Natural Ingredients
                                    </u>
                                </h6>
                                <p className="ingredients">These ingredients are designed to create lather and effectively remove dirt, oil, a</p>
                            </div>
                            <div className="right-side">
                                <div>
                                    <h4>
                                        {soap.name}
                                    </h4>
                                </div>

                                <br />
                                {soap.description}
                                <br />
                                Price: ${soap.price}
                                <br />
                                <div>
                                    Add <input type="number" min="1" placeholder="1" className={`${soapIndex}Input quantity`} /> To Cart
                                    <button className="buy-button" onClick={() => addItemToCart(soap.id, soap.name, document.querySelector(`.${soapIndex}Input`).value, soap.price, soap.image)}>Buy</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default HomeSoapCard;