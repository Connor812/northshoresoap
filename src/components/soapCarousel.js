import React, { useRef } from 'react';
import ImageComponent from '../utils/Image';

function SoapCarousel() {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className='p-2 d-flex align-items-center'>
            <div className="display-items-carousel-btn-container">
                <button className='display-items-carousel-btn' onClick={scrollLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                </button>
            </div>
            <div className='display-items-soap-carousel' ref={carouselRef} style={{ overflowX: 'auto', display: 'flex', whiteSpace: 'nowrap' }}>
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/factory.png" alt="Soap Factory. This is where the soaps made." className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/stir.png" alt="This is the mixing of the soap ingredients" className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/Pour.png" alt="This is how we pour out soap into the soap molds" className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/Scent.png" alt="This is the adding of the scents to the soap" className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/decorate.png" alt="This is how our professional soap makers decorate the soap" className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/cut.png" alt="Next is cutting the soap into pieces" className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/stano.png" alt="If the soap calls for it, we can stamp it with our logo, or name of the soap" className="soap-carousel-images" width="242px" height="144px" />
                <ImageComponent src="https://northshoresoapworks.com/images/makingsoap/cutsoap.jpg" alt="finally the end result!" className="soap-carousel-images" width="242px" height="144px" />
            </div>
            <div className="display-items-carousel-btn-container">
                <button className='display-items-carousel-btn' onClick={scrollRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SoapCarousel;
