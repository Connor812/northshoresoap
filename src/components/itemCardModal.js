import React from "react";
import { addItemToCart } from "../utils/addItemToCart.js";

function ItemCardModal({ soap, related_objects, index }) {
    const id = soap.item_data.variations[0].id;  // This is set up for only 1 variation
    const soapIndex = `soap_${id}`;
    const name = soap.item_data.name;
    const description = soap.item_data.description;
    const priceInCents = soap.item_data.variations[0].item_variation_data.price_money.amount;
    const price = parseFloat(soap.item_data.variations[0].item_variation_data.price_money.amount / 100).toFixed(2);
    const imageId = soap.item_data.image_ids[0];
    const imageObject = related_objects.find(obj => obj.id === imageId);
    const imageUrl = imageObject.image_data.url;

    return (
        <div key={index} className="modal fade" id={`${soapIndex}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body soap-display">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="left-side">
                            <img src="http://northshoresoapworks.com/images/white_bg_logo.jpg" alt="logo" className="soap-logo" />
                            <img src={imageUrl} alt={name} className="soap-image" />
                            <h6 className="natural-ingredients">
                                <u>
                                    Natural Ingredients
                                </u>
                            </h6>
                            <p className="ingredients">These ingredients are designed to create lather and effectively remove dirt, oil, a</p>
                        </div>
                        <div className="right-side">
                            <div className="d-flex justify-content-between">
                                <h4>
                                    {name}
                                </h4>

                            </div>

                            <br />
                            {description}
                            <br />
                            Price: ${price}
                            <br />
                            <div>
                                Add <input type="number" min="1" placeholder="1" className={`${soapIndex}Input quantity`} /> To Cart
                                <button id={`soap-buy-btn-${soapIndex}`} className="buy-button" onClick={() => addItemToCart(id, name, soapIndex, priceInCents, imageUrl, description)}>
                                    <svg width="25" height="25" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCardModal;