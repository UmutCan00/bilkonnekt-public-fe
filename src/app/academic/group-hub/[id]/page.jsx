"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const GroupPage = ({ params }) => {
  const [currentGroup, setCurrentGroup] = useState(null);

  const currentDate = new Date();
  const selectedGroup = {
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
  };
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const currentuserid = session?.user?._id;

  const handleBackButtonClick = () => {
    setCurrentGroup(null);
  };
  useEffect(() => {
    console.log(selectedGroup);
    console.log(params.id);

    // Update currentGroup only if it's different from selectedGroup
    if (selectedGroup) {
      setCurrentGroup(selectedGroup);
    }
  }, []);

  if (currentGroup) {
    return (
      <div>
        <Navbar />
        <div
          style={{ display: "flex", flexDirection: "column", height: "90vh" }}
        >
          <Link href="/academic/group-hub">
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
          </Link>
          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              padding: "20px",
            }}
          >
            {currentGroup.name + "   " + currentGroup.description}
            {/*currentGroup.members.map((member) => )*/}
            {currentGroup?.members?.map((member, index) => (
              <div key={index}>
                <div>
                  <p>{member}</p>
                </div>
              </div>
            ))}
            <Link href={"/academic/group-hub/" + selectedGroup._id + "/todo"}>
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
                  width: "10%",
                  fontSize: "14px",
                  color: "black",
                  alignItems: "right",
                }}
              >
                Go to Group Agenda Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default GroupPage;
