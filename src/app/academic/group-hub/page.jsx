"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const GroupPage = () => {
  const [currentGroup, setCurrentGroup] = useState(null);

  const currentDate = new Date();
  const router = useRouter();
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
    },
    { _id: 2, name: "Group 2", description: "Description for Group 2" },
    { _id: 3, name: "Group 3", description: "Description for Group 3" },
    { _id: 4, name: "Group 4", description: "Description for Group 4" },
    { _id: 5, name: "Group 5", description: "Description for Group 5" },
    { _id: 6, name: "Group 6", description: "Description for Group 6" },
    { _id: 7, name: "Group 7", description: "Description for Group 7" },
    // ... Add more groups as needed
  ];

  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const currentuserid = session?.user?._id;

  const handleGroupClick = (groupId) => {
    const selectedGroup = groups.find((group) => group._id === groupId);
    setCurrentGroup(selectedGroup);
    router.push("group-hub/" + groupId);
  };
  const handleBackButtonClick = () => {
    setCurrentGroup(null);
  };

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
          {"My Groups"}
        </div>

        {groups.map((group) => (
          <button
            key={group._id}
            onClick={() => handleGroupClick(group._id)}
            style={{
              cursor: "pointer",
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
              textAlign: "left",
              width: "50%",
              fontSize: "16px",
              color: "black",
            }}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
