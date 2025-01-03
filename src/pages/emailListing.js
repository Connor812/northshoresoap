import React, { useState } from 'react';
import '../assets/css/email-listing.css';

function EmailListing() {

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
        <div className='email-listing'>

            <div className="logo-container">
                <img
                    loading="lazy"
                    src="https://northshoresoapworks.com/images/bird.png"
                    className="bird-img bird-1"
                    alt=""
                />
                <img
                    loading="lazy"
                    src="https://northshoresoapworks.com/images/logo.png"
                    className="aboutus-logo"
                    alt=""
                />
                <img
                    loading="lazy"
                    src="https://northshoresoapworks.com/images/bird.png"
                    className="bird-img"
                    alt=""
                />
            </div>

            <div className='email-listing-form'>

                <h1>Become A Member Of Our Soapworks Club</h1>

                <p>
                    Become a member of the Soapworks Club and get exclusive discounts and special announcements!
                </p>

                <p className='mb-5'>We will send you an email with more info</p>

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
                        <p>You can cancel anytime</p>
                    </div>

                    <img loading="lazy" src="https://northshoresoapworks.com/images/soap.png" alt="Soap" />
                </div>
            </div>
        </div>
    )
}

export default EmailListing;