import React from "react";
import ItemCardModal from "./itemCardModal";

function ItemCard({ soap, related_objects, index }) {
    const id = soap.item_data.variations[0].id;  // This is set up for only 1 variation
    const soapIndex = `soap_${id}`;
    const name = soap.item_data.name;
    const imageId = soap.item_data.image_ids[0];
    const imageObject = related_objects.find(obj => obj.id === imageId);
    const imageUrl = imageObject.image_data.url;

    return (
        <div key={index}>
            <div className="soap-card-soap-page">
                <button data-bs-toggle="modal" data-bs-target={`#${soapIndex}`} className="soap-card-btn">
                    <img src={imageUrl} alt={name} style={{ maxWidth: '100%' }} />
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
