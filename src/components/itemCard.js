import React from "react";
import ItemCardModal from "./itemCardModal";
import ImageComponent from "../utils/Image";

function ItemCard({ soap, related_objects, index }) {
    const id = soap.item_data.variations[0].id;  // This is set up for only 1 variation
    const soapIndex = `soap_${id}`;
    const name = soap.item_data.name;
    let imageUrl;

    if (soap.item_data.image_ids) {
        const imageId = soap.item_data.image_ids[0];
        const imageObject = related_objects.find(obj => obj.id === imageId);
        imageUrl = imageObject.image_data.url;
    } else {
        imageUrl = "http://northshoresoapworks.com/images/replacement-image.png";
    }

    return (
        <div key={index}>
            <div className="soap-card-soap-page">
                <button data-bs-toggle="modal" data-bs-target={`#${soapIndex}`} className="soap-card-btn">
                    <ImageComponent src={imageUrl} alt={name} className="soap-card-image" height="144px" width="242px" />
                </button>

                <div className="soap-card-title">
                    {name}
                </div>
            </div>

            <ItemCardModal key={index} soap={soap} related_objects={related_objects} index={index} />
        </div>
    );
}

export default ItemCard;