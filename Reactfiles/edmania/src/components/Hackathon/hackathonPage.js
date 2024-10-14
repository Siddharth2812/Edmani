// HackathonPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const HackathonPage = () => {
    const [hackathon, setHackathon] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/v1/student/hackathon/${id}`)
            .then((response) => response.json())
            .then((data) => setHackathon(data))
            .catch((error) => console.error('Error fetching hackathon details:', error));
    }, [id]);

    return (
        <div>
            {hackathon ? (
                <Card style={{ marginBottom: '20px' }}>
                    <Card.Body>
                        {hackathon.organization_img && 
                            <img src={hackathon.organization_img} alt='organization_img'></img>
                        }
                        <Card.Title>{hackathon.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
                        <Card.Text>{hackathon.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Details</Card.Subtitle>
                        <ul>
                            <li>Organization: {hackathon.organization}</li>
                            <li>Timings: {hackathon.timings}</li>
                            <li>Dates: {hackathon.dates}</li>
                            <li>Rewards: {hackathon.rewards}</li>
                            {hackathon.eligibility && <li>Eligibility: {hackathon.eligibility}</li>}
                            {hackathon.isOnline && <li>This is an Online Event</li>}
                        </ul>

                        <Button variant="primary">Register</Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HackathonPage;
