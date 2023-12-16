"use client";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSession } from "next-auth/react";

export default function GroupPage() {
  const [groupId, setGroupId] = useState("");
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const joinGroup = async (groupId) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/joinStudyGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: groupId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(groupId);
    joinGroup(groupId);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enter Group ID</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Group ID"
                      value={groupId}
                      onChange={(e) => setGroupId(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
