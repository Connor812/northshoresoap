import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


function InitialModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} className='initial-modal' onHide={handleClose} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <center>
                    <h1>Grand Opening!</h1>
                </center>
            </Modal.Body>

        </Modal>
    );
}

export default InitialModal;