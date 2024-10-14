import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HackathonCard = () => {
    const [hackathons, setHackathons] = useState([]);

    useEffect(() => {
        // Fetch hackathons data from the server
        fetch('/api/v1/student/hackathons')
            .then((response) => response.json())
            .then((data) => setHackathons(data))
            .catch((error) => console.error('Error fetching hackathons:', error));
    }, []);

    return (
        <div>
            <h1>Hackathons</h1>
            <h4><a href='/hackathons/create' style={{ border: "solid", backgroundColor: "grey", color: "white" }}>Create a Hackathon</a></h4>
            {hackathons?.map((hackathon) => (
                <Card key={hackathon._id} style={{ marginBottom: '20px' }}>
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

                        {/* Use Link to navigate to the new page with /hackathon/:title */}
                        <Link to={`/hackathon/${hackathon._id}`}>
                            <Button variant="primary">Learn More</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default HackathonCard;
