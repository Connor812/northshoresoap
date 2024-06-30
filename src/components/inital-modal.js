import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';


function InitialModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => setShow(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        setError('');
        setSuccess('');

        if (!email || !name) {
            setError('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');

        fetch('https://northshoresoapworks.com/add_email_listing.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email }) // Convert the data to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Get the response text
            })
            .then(data => {
                // Log the parsed data
                if (data.error) {
                    setError(data.error);
                }
                if (data.success) {
                    setSuccess(data.success);
                }
            })
            .catch(error => {
                // Log any errors
                console.error('Error:', error);
                setError('An error occurred, please try again later');
            });
    }


    return (
        <Modal show={show} className='initial-modal' onHide={handleClose} centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
            </Modal.Header>
            <Modal.Body>
                <center>
                    <h1>GRAND OPENING CELEBRATION</h1>
                    <hr />
                    <p>Become a member of the Soapworks Club
                        Throughout our first week new members are eligible for our grand prize draw and soap giveaways.</p>

                    <h2>We will draw for a free gift daily
                        Grand Price Valued at $150</h2>

                    <p>We will send you an email with more info</p>

                    <div className='email-form-input-container'>
                        {error &&
                            <div class="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        {success &&
                            <div class="alert alert-success" role="alert">
                                {success}
                            </div>
                        }
                        <input type="text" name="name" placeholder='Name' id="name" required onChange={(e) => setName(e.target.value)} />
                        <input type="text" name="email" placeholder='Email' id="email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <button type="submit" className='email-form-submit' onClick={(event) => handleSubmit(event)}>Join Club</button>

                    <div className='email-form-bottom'>
                        <img loading="lazy" src="https://northshoresoapworks.com/images/gift-basket.png" alt="Gift Basket" />

                        <div>
                            <p>Soapworks Club members will get periodical special announcements and  special discounts</p>

                            <p>
                                You can cancel anytime
                            </p>
                        </div>

                        <img loading="lazy" src="https://northshoresoapworks.com/images/soap.png" alt="Soap" />
                    </div>

                </center>
            </Modal.Body>

        </Modal >
    );
}

export default InitialModal;