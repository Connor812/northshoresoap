import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../hooks/dataContext.js";
import { addItemToCart } from "../utils/addItemToCart.js";
import ImageComponent from "../utils/Image.js";
import Carousel from "react-bootstrap/Carousel";
import { Dropdown } from "react-bootstrap";

function ItemCardModal({ soap, related_objects, index }) {
    const dataProvider = useContext(DataContext);
    const options = dataProvider.options;
    const [selectedVariant, setSelectedVariant] = useState(soap.item_data.variations[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const id = selectedVariant.id;
    const soapIndex = `soap_${id}`;
    const name = soap.item_data.name;
    const description = soap.item_data.description;
    const imageId = soap.item_data.image_ids && soap.item_data.image_ids.length > 0 ? soap.item_data.image_ids[0] : 'no_id';
    const [imageUrl, setImageUrl] = useState(
        (related_objects.find(obj => obj.id === imageId)?.image_data?.url) || "https://northshoresoapworks.com/images/replacement-image.png"
    );

    useEffect(() => {
        setSelectedVariant(soap.item_data.variations[0]);
    }, [soap]);

    const priceInCents = selectedVariant.item_variation_data.price_money ? selectedVariant.item_variation_data.price_money.amount : 0;
    const price = parseFloat(priceInCents / 100).toFixed(2);

    const handleVariantChange = (variantId, imageId) => {
        const variant = soap.item_data.variations.find(variant => variant.id === variantId);
        const imageIndex = soap.item_data.image_ids.indexOf(imageId);
        const imageObject = related_objects.find(obj => obj.id === imageId);
        setImageUrl(imageObject.image_data.url);
        if (imageIndex !== -1) {
            setActiveIndex(imageIndex);
        }
        setSelectedVariant(variant);
    };

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    // get option name from option id
    let optionName = '';
    if (soap.item_data.item_options) {
        const optionId = soap.item_data.item_options[0].item_option_id;
        optionName = options.find(option => option.id === optionId).name;
    }

    return (
        <div key={index} className="modal fade" id={soapIndex} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered soap-card-modal-dialog">
                <div className="modal-content">
                    <div className="modal-body soap-display">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="left-side">
                            <center style={{ width: '100%' }}>
                                <img loading="lazy" src="https://northshoresoapworks.com/images/white_bg_logo.jpg" alt="logo" className="soap-logo" />
                            </center>
                            <Carousel activeIndex={activeIndex} onSelect={handleSelect} style={{ height: '330px', width: '330px' }}>
                                {soap.item_data.image_ids?.length === 0 ? (
                                    <Carousel.Item key={index}>
                                        <ImageComponent src="https://northshoresoapworks.com/images/replacement-image.png" alt={name} className="soap-image-modal" height="auto" width="300px" />
                                    </Carousel.Item>
                                ) : (
                                    soap.item_data.image_ids?.map((imageId, index) => {
                                        const imageObject = related_objects.find(obj => obj.id === imageId);
                                        return (
                                            <Carousel.Item key={index} style={{ width: '310px', height: '310px' }}>
                                                <ImageComponent src={imageObject.image_data.url} alt={name} className="item-modal-image" height="300px" width="300px" />
                                            </Carousel.Item>
                                        );
                                    })
                                )}
                            </Carousel>
                        </div>
                        <div className="right-side">
                            <div className="d-flex justify-content-between">
                                <h4>{name}</h4>
                            </div>
                            <div className="item-card-modal-description">
                                {description}
                            </div>
                            <div className="selection-container">
                                <div>
                                    Price: ${price}
                                </div>
                                {soap.item_data.variations.length > 1 && (
                                    <div>
                                        <Dropdown className="option-variation-btn">
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                {optionName}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {soap.item_data.variations.map((variant, index) => (
                                                    <Dropdown.Item key={index} onClick={() => handleVariantChange(variant.id, variant.item_variation_data.image_ids && variant.item_variation_data.image_ids.length > 0 ? variant.item_variation_data.image_ids[0] : 'no_id')}>{variant.item_variation_data.name}</Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )}
                            </div>
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

