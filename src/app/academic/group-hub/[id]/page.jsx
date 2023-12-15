"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const GroupPage = ({ params }) => {
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [currentGroup, setCurrentGroup] = useState(null);
  let currentGroups = [];
  const members = useRef([]);

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

  const currentuserid = session?.user?._id;

  const fetchUserGroupData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/seeUserGroups",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        currentGroups = data;
        if (currentGroups) {
          console.log("1", params.id);
          console.log("2", currentGroups);
          const foundGroup = currentGroups.find(
            (group) => group._id == params.id
          );
          if (foundGroup) {
            setCurrentGroup(foundGroup);
          }
        }
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
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserGroupData();
    fetchGroupMember();
  }, [token]);

  const handleBackButtonClick = () => {
    setCurrentGroup(null);
    currentGroups = null;
  };

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
            Group Name: {currentGroup.groupName}
            <br />
            Description: {currentGroup.description}
            <br />
            {"Members: "}
            {members.current.value?.map((member, index) => (
              <div key={index}>
                <div>
                  <p>
                    Username: {member.username}, Email: {member.email}
                  </p>
                </div>
              </div>
            ))}
            <Link href={"/academic/group-hub/" + params.id + "/todo"}>
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
