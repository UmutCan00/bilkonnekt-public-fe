// Create a new component, e.g., MaintenanceRequest.js
"use client";
//TODO Connect backend and delete mockdata
import React, { useState, useRef, useEffect } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useSession } from "next-auth/react";
import academicForumData from "../../../../mockdata/academicForumData";
import Navbar from "../../../../components/Navbar";
import Link from "next/link";

const MaintenanceRequest = ({ params }) => {
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [newRequest, setNewRequest] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("Pending");
  const currentUser = session?.user?._id;
  const members = useRef([]);
  const tasks = useRef([]);

  const completeGroupTask = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/completeGroupTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            taskId: "657ab7b165e4762b74b8ddf7",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("completed task", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const assignGroupTask = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/assignGroupTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: params.id,
            description: newRequest,
            assignedId: newAssignee,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        tasks.current.value = data;
        console.log("data3", members);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchGroupTask = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/seeGroupTasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: params.id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        tasks.current.value = data;
        console.log("data3", members);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchGroupMember = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/seeGroupParticipants",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: params.id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data2", data);
        members.current.value = data;
        console.log("data3", members);
        setNewAssignee(members.current.value[0].userId);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchGroupMember();
    fetchGroupTask();
  }, [token]);

  console.log("id= ", params);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequestItem = {
      id: 3,
      description: newRequest,
      assignee: newAssignee,
    };
    console.log("newRequest", newRequest);
    console.log("newAssignee", newAssignee);
    assignGroupTask();
    setNewRequest("");
    setNewAssignee(members.current.value[0].userId);
    window.location.reload();
  };

  const handleDeleteRequest = (id) => {};
  const handleMarkDone = (taskId) => {
    completeGroupTask(taskId);
  };

  console.log("gr", members.current.value);

  return (
    <div>
      <Navbar />
      <Link href={"/academic/group-hub/" + params.id}>
        <button
          style={{
            cursor: "pointer",
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            width: "5%",
            fontSize: "14px",
            color: "black",
            alignItems: "right",
          }}
        >
          Back to Group Hub
        </button>
      </Link>
      <div className="container mt-4">
        <h1>Add a New Request</h1>

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
          <Form.Group controlId="assignee">
            <Form.Label>Assignee</Form.Label>
            <Form.Control
              as="select"
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
            >
              {members?.current?.value?.map((member) => (
                <option key={member.userId} value={member.userId}>
                  {member.name}
                </option>
              ))}
            </Form.Control>
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
          {tasks &&
            tasks?.current?.value?.map((request) =>
              !false ? (
                <ListGroup.Item key={request._id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Description:</strong> {request.description}
                    </div>
                    <div>
                      <strong>Assignee:</strong> {request.studentId}
                    </div>
                    {currentUser == request.studentId && (
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteRequest(request._id)}
                          style={{ color: "black", marginRight: "5px" }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => handleMarkDone(request._id)}
                          style={{ color: "black", marginRight: "5px" }}
                        >
                          Mark Done
                        </Button>
                      </div>
                    )}
                  </div>
                </ListGroup.Item>
              ) : null
            )}
        </ListGroup>

        <div style={{ marginTop: "10px" }}>
          <h2>Finished Requests</h2>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequest;
