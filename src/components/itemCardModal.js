import React, { useState, useEffect } from "react";
import { addItemToCart } from "../utils/addItemToCart.js";
import ImageComponent from "../utils/Image.js";
import Carousel from "react-bootstrap/Carousel";
import { Dropdown } from "react-bootstrap";

function ItemCardModal({ soap, related_objects, index }) {
    const [selectedVariant, setSelectedVariant] = useState(soap.item_data.variations[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState(getInitialImageUrl(soap, related_objects));

    useEffect(() => {
        setSelectedVariant(soap.item_data.variations[0]);
    }, [soap]);

    const handleVariantChange = (variantId, imageId) => {
        const variant = soap.item_data.variations.find(variant => variant.id === variantId);
        const newImageUrl = getImageUrlById(imageId, related_objects);

        if (imageId && soap.item_data.image_ids.includes(imageId)) {
            setActiveIndex(soap.item_data.image_ids.indexOf(imageId));
        }

        setImageUrl(newImageUrl);
        setSelectedVariant(variant);
    };

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const price = getPrice(selectedVariant);

    return (
        <div key={index} className="modal fade" id={`soap_${selectedVariant.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered soap-card-modal-dialog">
                <div className="modal-content">
                    <div className="modal-body soap-display">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="left-side">
                            <center style={{ width: '100%' }}>
                                <img loading="lazy" src="https://northshoresoapworks.com/images/white_bg_logo.jpg" alt="logo" className="soap-logo" />
                            </center>
                            <Carousel activeIndex={activeIndex} onSelect={handleSelect} style={{ height: '330px', width: '330px' }}>
                                {renderCarouselItems(soap, related_objects, index)}
                            </Carousel>
                        </div>
                        <div className="right-side">
                            <div className="d-flex justify-content-between">
                                <h4>{soap.item_data.name}</h4>
                            </div>
                            <div className="item-card-modal-description">
                                {soap.item_data.description}
                            </div>
                            <div className="selection-container">
                                <div>Price: ${price}</div>
                                {renderVariantDropdown(soap, selectedVariant, handleVariantChange)}
                            </div>
                            <div>
                                Add <input type="number" min="1" placeholder="1" className={`soap_${selectedVariant.id}Input quantity`} /> To Cart
                                {renderAddToCartButton(selectedVariant, soap, addItemToCart, price, imageUrl)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getInitialImageUrl(soap, related_objects) {
    const imageId = soap.item_data.image_ids && soap.item_data.image_ids.length > 0 ? soap.item_data.image_ids[0] : 'no_id';
    return related_objects.find(obj => obj.id === imageId)?.image_data?.url || "https://northshoresoapworks.com/images/replacement-image.png";
}

function getImageUrlById(imageId, related_objects) {
    return related_objects.find(obj => obj.id === imageId)?.image_data?.url || "https://northshoresoapworks.com/images/replacement-image.png";
}

function getPrice(selectedVariant) {
    const priceInCents = selectedVariant.item_variation_data.price_money ? selectedVariant.item_variation_data.price_money.amount : 0;
    return parseFloat(priceInCents / 100).toFixed(2);
}

function checkOutOfStock(variant) {
    const { track_inventory, location_overrides } = variant.item_variation_data;
    if (!track_inventory) return false;

    const locationOverride = location_overrides?.find(override => override.location_id === "L1PBJNPB892SA");
    return locationOverride?.sold_out || false;
}

function renderCarouselItems(soap, related_objects, index) {
    if (soap.item_data.image_ids?.length === 0) {
        return (
            <Carousel.Item key={index}>
                <ImageComponent src="https://northshoresoapworks.com/images/replacement-image.png" alt={soap.item_data.name} className="soap-image-modal" height="auto" width="300px" />
            </Carousel.Item>
        );
    }
    return soap.item_data.image_ids?.map((imageId, index) => {
        const imageObject = related_objects.find(obj => obj.id === imageId);
        return (
            <Carousel.Item key={index} style={{ width: '310px', height: '310px' }}>
                <ImageComponent src={imageObject.image_data.url} alt={soap.item_data.name} className="item-modal-image" height="300px" width="300px" />
            </Carousel.Item>
        );
    });
}

function renderVariantDropdown(soap, selectedVariant, handleVariantChange) {
    if (soap.item_data.variations.length <= 1) return null;
    return (
        <div>
            <Dropdown className="option-variation-btn">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {selectedVariant.item_variation_data.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {soap.item_data.variations.map((variant, index) => (
                        <Dropdown.Item key={index} onClick={() => handleVariantChange(variant.id, variant.item_variation_data.image_ids?.[0] || 'no_id')}>
                            {variant.item_variation_data.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

function renderAddToCartButton(selectedVariant, soap, addItemToCart, price, imageUrl) {
    const priceInCents = price * 100;
    const soapIndex = `soap_${selectedVariant.id}`;
    if (checkOutOfStock(selectedVariant)) {
        return <button className="buy-button" disabled>Out of Stock</button>;
    }
    if (soap.item_data.categories?.some(category => category.id === "EP6LOPRSICPK4JBL2ER5DE34")) {
        return <p className="mt-2">Not available for online order</p>;
    }
    return (
        <button id={`soap-buy-btn-${soapIndex}`} className="buy-button" onClick={() => addItemToCart(selectedVariant.id, soap.item_data.name, soapIndex, priceInCents, imageUrl, soap.item_data.description)}>
            <svg width="25" height="25" viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
        </button>
    );
}

export default ItemCardModal;
