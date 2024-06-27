import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';

function HomeCarousel() {
    const [carouselImages, setCarouselImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Set loading state to true before fetching data
        fetch("https://northshoresoapworks.com/getCarouselImages.php", {
            method: "GET",
            headers: {
                "Accept": "application/json", // Indicate that the client expects a JSON response
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setCarouselImages(data);
                setLoading(false); // Set loading state to false after fetching data
            })
            .catch(error => {
                console.error("Error:", error);
                setLoading(false); // Set loading state to false if there's an error
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Carousel>
                    {carouselImages.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img loading="lazy" src={image.src} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
                            <Carousel.Caption>
                                <h3>{image.title}</h3>
                                <p>{image.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default HomeCarousel;
