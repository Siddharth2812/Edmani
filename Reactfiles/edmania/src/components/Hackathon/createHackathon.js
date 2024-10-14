import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import './HackathonForm.css';

const HackathonForm = () => {
    const [hackathonData, setHackathonData] = useState({
        title: '',
        description: '',
        organization: '',
        timings: '',
        imageLink: '',
        eligibility: '',
        isOnline: false,
        countTeam: 1,
        price: 0,
        dates: '',
        isCompilerRequired: false,
        isTestRequired: false,
        rewards: '',
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHackathonData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setHackathonData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const response = await fetch('/api/v1/admin/create/hackathon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hackathonData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success('Hackathon created successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => {
                    setShowSuccessModal(true);
                },
            });
        } catch (error) {
            console.error('Error creating hackathon:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
    };

    const handleCreateNew = () => {
        setHackathonData({
            title: '',
            description: '',
            organization: '',
            timings: '',
            imageLink: '',
            eligibility: '',
            isOnline: false,
            countTeam: 1,
            price: 0,
            dates: '',
            isCompilerRequired: false,
            isTestRequired: false,
            rewards: '',
        });

        setShowSuccessModal(false);
    };

    const handleGoBack = () => {
        window.location.href = '/hackathons';
    };

    useEffect(() => {
        return () => {
            setIsSubmitting(false);
        };
    }, []);

    return (
        <div className={isSubmitting ? 'submitting' : ''}>
            <h1>Fill the form to create a new Hackathon</h1>
            <form onSubmit={handleSubmit}> <label> Title: <input type="text" name="title" value={hackathonData.title} onChange={handleInputChange} /> </label> <br /> <label> Description: <textarea name="description" value={hackathonData.description} onChange={handleInputChange}></textarea> </label> <br /> <label> Organization: <input type="text" name="organization" value={hackathonData.organization} onChange={handleInputChange} /> </label> <br /> <label> Timings: <input type="text" name="timings" value={hackathonData.timings} onChange={handleInputChange} /> </label> <br /> <label> Image Link: <input type="text" name="imageLink" value={hackathonData.imageLink} onChange={handleInputChange} /> </label> <br /> <label> Eligibility: <input type="text" name="eligibility" value={hackathonData.eligibility} onChange={handleInputChange} /> </label> <br /> <label> Is Online: <input type="checkbox" name="isOnline" checked={hackathonData.isOnline} onChange={handleCheckboxChange} /> </label> <br /> <label> Count Team: <input type="number" name="countTeam" value={hackathonData.countTeam} onChange={handleInputChange} /> </label> <br /> <label> Price: <input type="number" name="price" value={hackathonData.price} onChange={handleInputChange} /> </label> <br /> <label> Dates: <input type="text" name="dates" value={hackathonData.dates} onChange={handleInputChange} /> </label> <br /> <label> Is Compiler Required: <input type="checkbox" name="isCompilerRequired" checked={hackathonData.isCompilerRequired} onChange={handleCheckboxChange} /> </label> <br /> <label> Is Test Required: <input type="checkbox" name="isTestRequired" checked={hackathonData.isTestRequired} onChange={handleCheckboxChange} /> </label> <br /> <label> Rewards: <input type="text" name="rewards" value={hackathonData.rewards} onChange={handleInputChange} /> </label> <br /> <button type="submit">Submit</button> </form>
            <ToastContainer />

            <Modal show={showSuccessModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Hackathon Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your hackathon has been created successfully!</p>
                    <p>Do you want to create a new hackathon or go back to the hackathons page?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateNew}>
                        Create New
                    </Button>
                    <Button variant="primary" onClick={handleGoBack}>
                        Go Back to Hackathons
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HackathonForm;
