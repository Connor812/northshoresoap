import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../assets/css/footer.css";
import { Link } from 'react-router-dom';
import { DataContext } from '../hooks/dataContext';

function Footer() {

    const dataProvider = useContext(DataContext);
    const categories = dataProvider.categories;

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <footer>
            <div className='back-to-top'>
                <button className='back-to-top-btn' onClick={() => scrollToTop()}>
                    <h3>
                        Back To The Top
                    </h3>
                </button>
            </div>

            <section className='footer-main-section-container'>
                <Row className="footer-main-section">
                    <Col md={3} className='footer-category-container'>
                        <div className=''>
                            {
                                categories.map((category, index) => {

                                    return (
                                        <>
                                            <Link key={index} to={`/display_items/${category.id}`} className='footer-link'>
                                                {category.name}
                                            </Link>
                                            <br />
                                        </>

                                    )

                                })
                            }
                        </div>
                    </Col>
                    <Col md={6} className='footer-middle-section'>
                        <center>
                            <img src="https://northshoresoapworks.com/images/white_bg_logo.jpg" alt="Northshore logo" className="footer-logo" />
                        </center>
                        <div className='footer-info-container'>
                            359 MAIN STREET
                            <br />
                            PORT DOVER ONT CANADA N0A1N0
                            <br />
                            <a href="mailto:stephanie@northshoresoapworks.ca" className='email-link'>
                                STEPHANIE@NORTHSHORESOAPWORKS.COM
                            </a>
                            <br />
                            519-583-3977
                            <br />
                            STEPHANIE MISNER - OWNER
                            <br />
                        </div>
                    </Col>
                    <Col md={3} className='footer-right-section d-flex align-items-center'>
                        <div className='join-club-section'>
                            <h4>North Shore SoapWorks Club</h4>
                            <div className='mb-2'>
                                Special members offers and discounts
                                <br />
                                monthly Promotions
                                <br />
                                Draws and giveaways
                            </div>

                            <Link to="/email_listing" className='join-club-btn'>
                                Join Club
                            </Link>

                        </div>
                    </Col>
                </Row>
                <div className='footer-copy-right'>
                    © 2024 north shore soapworks - businesslore systems inc
                </div>
            </section>
        </footer>
    )
}

export default Footer;