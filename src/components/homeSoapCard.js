import React from "react";
import ItemCardModal from "./itemCardModal.js";
import ImageComponent from "../utils/Image.js";

function HomeSoapCard({ soap, related_objects, index }) {
    const id = soap.item_data.variations[0].id;  // This is set up for only 1 variation
    const soapIndex = `soap_${id}`;
    const name = soap.item_data.name;
    let imageUrl;

    if (soap.item_data.image_ids) {
        const imageId = soap.item_data.image_ids[0];
        const imageObject = related_objects.find(obj => obj.id === imageId);
        imageUrl = imageObject.image_data.url;
    } else {
        imageUrl = "https://northshoresoapworks.com/images/replacement-image.png";
    }

    return (
        <React.Fragment key={index}>
            <button data-bs-toggle="modal" data-bs-target={`#${soapIndex}`} key={id} className="soap-card">
                <ImageComponent src={imageUrl} alt="Soap" className="soap-card-img" height="140px" width="210px" />
                <h6>{name}</h6>
            </button>

            <ItemCardModal key={index} soap={soap} related_objects={related_objects} index={index} />

        </React.Fragment>

    );
}

export default HomeSoapCard;