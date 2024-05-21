import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function SoapCarousel() {
    return (
        <Carousel style={{ maxWidth: "600px" }}>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/factory.png" alt="First slide" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/stir.png" alt="Second slide" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/Pour.png" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/Scent.png" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Fourth slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/decorate.png" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Fifth slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/cut.png" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Sixth slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/stano.png" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Seventh slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="http://northshoresoapworks.com/images/makingsoap/cutsoap.jpg" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Eighth slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default SoapCarousel;