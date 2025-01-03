import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ChristmasPost from '../assets/images/christmas-model.jpg'

function InitialModal() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => setShow(false);

    useEffect(() => {
        fetch("https://northshoresoapworks.com/get-initial-model.php")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setText(result.text);
                    setImage(result.image);
                    setLoading(false);
                }
            )
            .catch((error) => {
                setError(error);
                setLoading(false);
                console.log(error);
            });
    }, []);


    return (
        <Modal show={show} className='initial-modal' onHide={handleClose} centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
            </Modal.Header>
            <Modal.Body>
                <center>

                    {loading ? (
                        <Spinner></Spinner>
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        <>
                            <div>{text}</div>
                            <img src={image} alt={text} style={{ width: '100%', height: 'auto' }} />
                        </>
                    )}

                </center>
            </Modal.Body>
        </Modal>
    );
}

export default InitialModal;