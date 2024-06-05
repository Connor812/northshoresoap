import React from "react";
import { addItemToCart } from "../utils/addItemToCart.js";
import ImageComponent from "../utils/Image.js";

function ItemCardModal({ soap, related_objects, index }) {
    const id = soap.item_data.variations[0].id;  // This is set up for only 1 variation
    const soapIndex = `soap_${id}`;
    const name = soap.item_data.name;
    const description = soap.item_data.description;

    let priceInCents;
    let price;
    if (soap.item_data.variations[0].item_variation_data.price_money) {
        priceInCents = soap.item_data.variations[0].item_variation_data.price_money.amount;
        price = parseFloat(priceInCents / 100).toFixed(2);
    } else {
        priceInCents = 0;
        price = parseFloat(priceInCents / 100).toFixed(2);
    }

    let imageUrl;
    if (soap.item_data.image_ids) {
        const imageId = soap.item_data.image_ids[0];
        const imageObject = related_objects.find(obj => obj.id === imageId);
        imageUrl = imageObject.image_data.url;
    } else {
        imageUrl = "http://northshoresoapworks.com/images/replacement-image.png";
    }

    return (
        <div key={index} className="modal fade" id={`${soapIndex}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered soap-card-modal-dialog">
                <div className="modal-content">
                    <div className="modal-body soap-display">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="left-side">
                            <img loading="lazy" src="http://northshoresoapworks.com/images/white_bg_logo.jpg" alt="logo" className="soap-logo" />
                            <ImageComponent src={imageUrl} alt={name} className="soap-image-modal" height="auto" width="300px" />
                            {/* <h6 className="natural-ingredients">
                                <u>
                                    Natural Ingredients
                                </u>s
                            </h6>
                            <p className="ingredients">These ingredients are designed to create lather and effectively remove dirt, oil, a</p> */}
                        </div>
                        <div className="right-side">
                            <div className="d-flex justify-content-between">
                                <h4>
                                    {name}
                                </h4>

                            </div>
                            <div className="item-card-modal-description">
                                {description}
                            </div>
                            Price: ${price}
                            <br />
                            <div>
                                Add <input type="number" min="1" placeholder="1" className={`${soapIndex}Input quantity`} /> To Cart

                                {priceInCents === 0 ? (
                                    <button className="buy-button" disabled>
                                        Out of Stock
                                    </button>
                                ) : (
                                    <button id={`soap-buy-btn-${soapIndex}`} className="buy-button" onClick={() => addItemToCart(id, name, soapIndex, priceInCents, imageUrl, description)}>
                                        <svg width="25" height="25" viewBox="0 0 16 16">
                                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCardModal;