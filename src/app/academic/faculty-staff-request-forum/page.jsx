// Create a new component, e.g., MaintenanceRequest.js
"use client";
//TODO Connect backend and delete mockdata
import React, { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import academicForumData from "../../mockdata/academicForumData";
import Navbar from "../../components/Navbar";

const MaintenanceRequest = () => {
  const [requests, setRequests] = useState(academicForumData);
  const [newRequest, setNewRequest] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDate, setNewDate] = useState(Date.now());
  const [filterStatus, setFilterStatus] = useState("Pending");
  const [currentUser, setCurrentUser] = useState("owner-id-1"); // TODO Replace with actual user ID from seesion

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequestItem = {
      id: uuidv4(),
      description: newRequest,
      location: newLocation,
      date: new Date(newDate),
      status: "Pending",
      ownerId: currentUser, // Assign the owner ID
    };
    setRequests([...requests, newRequestItem]);
    setNewRequest("");
    setNewLocation("");
    setNewDate(Date.now());
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map((request) => {
      if (request.uuid === id) {
        return { ...request, status: newStatus };
      }
      return request;
    });

    setRequests(updatedRequests);
  };

  const handleDeleteRequest = (id) => {
    const updatedRequests = requests.filter((request) => request.uuid !== id);
    setRequests(updatedRequests);
  };

  const sortedRequests = [...requests].sort((a, b) => {
    const dateComparison = a.date;

    if (dateComparison !== 0) {
      return -dateComparison;
    }

    if (a.status === "Pending" && b.status !== "Pending") {
      return -1;
    }

    if (a.status !== "Pending" && b.status === "Pending") {
      return 1;
    }

    return 0;
  });

  // Filter requests based on selected status
  const filteredRequests = sortedRequests.filter((request) => {
    if (filterStatus === "All") {
      return true;
    }
    return request.status === filterStatus;
  });

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Maintenance Requests</h1>

        <div className="mb-3">
          <Button
            variant="outline-primary"
            className="mr-2"
            onClick={() => setFilterStatus("All")}
          >
            All
          </Button>
          <Button
            variant="outline-primary"
            className="mr-2"
            onClick={() => setFilterStatus("Pending")}
          >
            Pending
          </Button>
          <Button
            variant="outline-primary"
            className="mr-2"
            onClick={() => setFilterStatus("In Progress")}
          >
            In Progress
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setFilterStatus("Done")}
          >
            Done
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter request description"
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date (Leave Blank for Today)</Form.Label>
            <Form.Control
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginBottom: "20px", marginTop: "10px" }}
          >
            Submit Request (Academic)
          </Button>
        </Form>

        <hr />
        <div style={{ marginTop: "10px" }}>
          <h2>Current Requests</h2>
        </div>

        <ListGroup>
          {filteredRequests.map((request) => (
            <ListGroup.Item key={request.uuid}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Status:</strong> {request.status}
                </div>
                <div>
                  {request.status === "Pending" && (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleStatusChange(request.uuid, "In Progress")
                      }
                      style={{ color: "black" }}
                    >
                      Mark In Progress (Staff)
                    </Button>
                  )}
                  {request.status === "In Progress" && (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleStatusChange(request.uuid, "Completed")
                      }
                      style={{ color: "black" }}
                    >
                      Mark Completed (Staff)
                    </Button>
                  )}
                  {request.ownerId === currentUser && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRequest(request.uuid)}
                      style={{ color: "black", marginLeft: "15px" }}
                    >
                      Delete Request
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(request.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Location:</strong> {request.location}
              </div>
              {request.description}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default MaintenanceRequest;
