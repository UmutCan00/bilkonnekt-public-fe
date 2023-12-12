"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";

const GroupPage = () => {
  const [currentGroup, setCurrentGroup] = useState(null);

  const currentDate = new Date();
  const groups = [
    {
      _id: 1,
      name: "Group 1",
      description: "Description for Group 1",
      members: [
        "member1@example.com",
        "member2@example.com",
        "member3@example.com",
        "member4@example.com",
      ],
      todoList: [
        {
          createdBy: "member1@example.com",
          assignedTo: "member2@example.com",
          description: "Task 1 description",
        },
        {
          createdBy: "member2@example.com",
          assignedTo: "member3@example.com",
          description: "Task 2 description",
        },
        {
          createdBy: "member3@example.com",
          assignedTo: "member4@example.com",
          description: "Task 3 description",
        },
        // ... Add more to-do tasks as needed
      ],
      lesson: "CS315",
    },
    {
      _id: 2,
      name: "Group 2",
      description: "Description for Group 2",
      lesson: "CS315",
    },
    {
      _id: 3,
      name: "Group 3",
      description: "Description for Group 3",
      lesson: "CS315",
    },
    {
      _id: 4,
      name: "Group 4",
      description: "Description for Group 4",
      lesson: "CS315",
    },
    {
      _id: 5,
      name: "Group 5",
      description: "Description for Group 5",
      lesson: "CS315",
    },
    {
      _id: 6,
      name: "Group 6",
      description: "Description for Group 6",
      lesson: "CS315",
    },
    {
      _id: 7,
      name: "Group 7",
      description: "Description for Group 7",
      lesson: "CS315",
    },
    // ... Add more groups as needed
  ];

  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const currentuserid = session?.user?._id;

  const handleGroupClick = (groupId) => {
    const selectedGroup = groups.find((group) => group._id === groupId);
    setCurrentGroup(selectedGroup);
  };
  const handleBackButtonClick = () => {
    setCurrentGroup(null);
  };
  const handleJoinButtonClick = () => {};

  if (currentGroup) {
    return (
      <div>
        <Navbar />
        <div
          style={{ display: "flex", flexDirection: "column", height: "90vh" }}
        >
          <button
            onClick={handleBackButtonClick}
            style={{
              cursor: "pointer",
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
              textAlign: "left",
              width: "5%",
              fontSize: "16px",
              color: "black",
              alignItems: "right",
            }}
          >
            Back
          </button>
          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              padding: "20px",
            }}
          >
            {currentGroup.name}
            <br />
            {currentGroup.description}
            <br />
            {currentGroup.lesson}
            {/*currentGroup.members.map((member) => )*/}
            {currentGroup?.members?.map((member, index) => (
              <div key={index}>
                <div>
                  <p>{member}</p>
                </div>
              </div>
            ))}
            <button
              onClick={handleJoinButtonClick}
              style={{
                cursor: "pointer",
                display: "block",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                width: "10%",
                fontSize: "16px",
                color: "black",
                alignItems: "right",
              }}
            >
              Join Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            fontSize: "32px",
            color: "black",
            marginTop: "0px",
            marginBottom: "10px",
          }}
        >
          {"Groups with Missing Members"}
        </div>

        {groups.map((group) => (
          <div key={group._id}>
            {" "}
            {/* Add the key prop here */}
            <div
              style={{
                cursor: "pointer",
                display: "block",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
                textAlign: "left",
                width: "50%",
                fontSize: "16px",
                color: "black",
              }}
            >
              {group.name}
            </div>
            <button
              onClick={() => handleGroupClick(group._id)}
              style={{
                cursor: "pointer",
                display: "block",
                marginBottom: "10px",
                fontSize: "16px",
                color: "black",
              }}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
