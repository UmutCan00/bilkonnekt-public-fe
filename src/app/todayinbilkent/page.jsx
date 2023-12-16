"use client";
import { useEffect } from "react";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";

const eventsData = [
  {
    id: 1,
    title: 'Event 1',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 1',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 2',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 2',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 2',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 2',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 2',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-01-01',
    image: 'https://placekitten.com/300/200',
    description: 'Description for Event 2',
  },
  // Add more events as needed
];

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Navbar />
    <Container> 
            
      <h1>Events</h1>
      <Row>
        {eventsData.map((event) => (
          <Col key={event.id} xs={12} md={6} lg={4}>
            <div className="event-card" onClick={() => handleEventClick(event)}>
              <img src={event.image} alt={event.title} className="img-fluid" />
              <h3>{event.title}</h3>
              <p>{event.date}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedEvent?.image} alt={selectedEvent?.title} className="img-fluid" />
          <p style={{ color: "black" }}>{selectedEvent?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} style={{ color: "black" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default EventsPage;
