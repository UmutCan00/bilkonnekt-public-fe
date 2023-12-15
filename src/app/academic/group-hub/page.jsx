"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const GroupPage = () => {
  const [currentGroups, setCurrentGroups] = useState([]);

  const currentDate = new Date();
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
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
        console.log(data);
        setCurrentGroups(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGroupClick = (groupId) => {
    router.push("group-hub/" + groupId);
  };

  useEffect(() => {
    fetchUserGroupData();
  }, [token]);

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

        {currentGroups.map((group) => (
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
            {group.groupName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
